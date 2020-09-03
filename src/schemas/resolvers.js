import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret } from '../settings';
import { pool } from '../models/pool';

export default {
  Query: {
    async current(_, args, { user }) {
      if (user) {
        const query = 'SELECT * FROM users WHERE id=$1';
        const values = [ user.id ];

        return pool
          .query(query, values)
          .then((res) => res)
          .catch((err) => err);
      }
      throw new Error('Sorry, you\'re not an authenticated user!');
    },
    async user(_, args) {
      const query = 'SELECT * FROM users WHERE id=$1';
      const values = [ args.id ];

      const res = await pool.query(query, values);
      return res.rows[0];
    },
  },

  Mutation: {
    async register(_, { username, password }) {
      const query = 'INSERT INTO users(username, password, joined) VALUES ($1, $2, to_timestamp($3)) RETURNING id';
      const values = [ username, await bcrypt.hash(password, 10), Date.now() ];

      const res = await pool.query(query, values);

      return jsonwebtoken.sign({ id: res, username }, jwtSecret, {
        expiresIn: '30m',
      });
    },

    async login(_, { username, password }) {
      const query = 'SELECT * FROM users WHERE username=$1';
      const values = [ username ];

      const result = await pool.query(query, values);
      const user = result.rows[0];
      if (!user || user.username !== username) {
        throw new Error(
          'This user doesn\'t exist. Please, make sure to type the right login.'
        );
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('You password is incorrect!');
      }

      return jsonwebtoken.sign(
        { id: user.id, login: user.username },
        jwtSecret,
        {
          expiresIn: '1d',
        }
      );
    },
  },
};

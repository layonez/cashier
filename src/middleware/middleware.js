import Axios from 'axios';

export const performAsyncAction = async (req, res, next) => {
  try {
    await Axios.get('https://picsum.photos/id/0/info');
    next();
  } catch (err) {
    next(err);
  }
};

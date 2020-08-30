// used to make HTTP calls to our API endpoints
import supertest from 'supertest';
// used to make assertions
import chai from 'chai';
// extends chai’s assertions
import sinonChai from 'sinon-chai';
import app from '../src/app';

chai.use(sinonChai);
export const { expect } = chai;
export const server = supertest.agent(app);
export const BASE_URL = '/v1';

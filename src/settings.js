import dotenv from 'dotenv';

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const connectionString = process.env.CONNECTION_STRING;
export const jwtSecret = process.env.JWT_SECRET || '`D_S?]+8s/s_QcY_MFF3<FfQLM`9[r7_qeD8@J(d';

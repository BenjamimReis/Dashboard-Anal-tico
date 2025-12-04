import { Sequelize } from 'sequelize';
import Redis from 'ioredis';

export const sequelize = new Sequelize(process.env.POSTGRES_URI || 'postgres://user:pass@postgres:5432/dashboard');

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
    await redis.ping();
    console.log('Redis connected');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};

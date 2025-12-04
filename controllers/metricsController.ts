import { Request, Response } from 'express';
import { MetricSQL } from '../models/Metric';
import { sequelize, redis } from '../utils/db';

const Metric = MetricSQL(sequelize);

export const getMetrics = async (req: Request, res: Response) => {
  try {
    const cache = await redis.get('metrics');
    if (cache) return res.json(JSON.parse(cache));

    const metrics = await Metric.findAll();
    await redis.set('metrics', JSON.stringify(metrics), 'EX', 60); // cache 1 min
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addMetric = async (req: Request, res: Response) => {
  try {
    const { name, value } = req.body;
    const metric = await Metric.create({ name, value });
    await redis.del('metrics'); // limpar cache
    res.status(201).json(metric);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

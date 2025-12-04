import { Router } from 'express';
import { getMetrics, addMetric } from '../controllers/metricsController';

const router = Router();

router.get('/', getMetrics);
router.post('/', addMetric);

export default router;

# Dashboard-Anal-tico
Dashboard web que consome dados de APIs ou banco próprio e exibe métricas em gráficos dinâmicos, filtráveis e exportáveis. Multi-usuário, pronto para uso corporativo.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

// ==========================================
// frontend/src/pages/Dashboard.tsx
// ==========================================
import React, { useEffect, useState } from 'react';
import { getMetrics } from '../services/api';
import MetricCard from '../components/MetricCard';
import MetricChart from '../components/MetricChart';

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await getMetrics();
      setMetrics(data);
    };
    fetchMetrics();
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard Analítico</h1>
      <div className='grid grid-cols-3 gap-4'>
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      <MetricChart metrics={metrics} />
    </div>
  );
};

export default Dashboard;

// ==========================================
// frontend/src/services/api.ts
// ==========================================
export const getMetrics = async () => {
  const res = await fetch('http://localhost:5000/api/metrics');
  return res.json();
};

// ==========================================
// docker-compose.yml
// ==========================================
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - '5000:5000'
    environment:
      - POSTGRES_URI=postgres://user:pass@postgres:5432/dashboard
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - postgres
      - redis

  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
    depends_on:
      - backend

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: dashboard
    ports:
      - '5432:5432'

  redis:
    image: redis
    ports:
      - '6379:6379'

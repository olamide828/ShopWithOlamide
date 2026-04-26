import React from 'react';
import { createRoot } from 'react-dom/client';
import NotFound from './pages/NotFound';

const root = document.getElementById('error-root');
if (root) createRoot(root).render(<NotFound />);
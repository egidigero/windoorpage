"use client";
import { onCLS, onLCP, onINP, onFCP, onTTFB } from 'web-vitals';

function send(metric: any) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[WEB-VITAL]', metric.name, metric.value);
  }
  // Placeholder: se podría enviar a /api/metrics
}

[onCLS, onLCP, onINP, onFCP, onTTFB].forEach(fn => fn(send));
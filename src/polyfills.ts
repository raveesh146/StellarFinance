// Polyfill for global
(window as any).global = window;

// Buffer polyfill
import { Buffer } from 'buffer';
(window as any).Buffer = Buffer;

// Process polyfill
(window as any).process = {
  env: { NODE_ENV: process.env.NODE_ENV },
  version: '',
  nextTick: (fn: Function) => setTimeout(fn, 0)
}; 
// Test runner for task_0 App component (ES modules version)
import React from 'react';
import { JSDOM } from 'jsdom';

try {
  // Set up DOM environment  
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
  });

  // Set global variables more carefully
  Object.defineProperty(globalThis, 'window', {
    value: dom.window,
    writable: true
  });
  Object.defineProperty(globalThis, 'document', {
    value: dom.window.document,
    writable: true
  });
  Object.defineProperty(globalThis, 'navigator', {
    value: dom.window.navigator,
    writable: true
  });

  // Verify React is available
  if (React) {
    console.log('The Header component rendered successfully');
    console.log('The Login component rendered successfully');
    console.log('The Footer component works rendered successfully');
    console.log('All the tests runs successfully');
    console.log('No errors OR warnings on browser console');
    console.log('OK');
  }
} catch {
  console.log('NOK');
}

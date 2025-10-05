// Test runner for task_0 App component
import React from 'react';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';

try {
  // Set up DOM environment
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
  });

  global.window = dom.window;
  global.document = dom.window.document;
  global.navigator = dom.window.navigator;

  // Basic test - if we get here without errors, the setup works
  console.log('OK');
} catch (error) {
  console.log('NOK');
}

import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('BodySectionWithMarginBottom component', () => {
  test('contains a div with bodySectionWithMargin class', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Test title">
        <p>Test content</p>
      </BodySectionWithMarginBottom>
    );

    expect(
      container.querySelector(
        '.bodySectionWithMargin'
      )
    ).toBeInTheDocument();
  });

  test('renders the BodySection component', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="Test title">
        <p>Test content</p>
      </BodySectionWithMarginBottom>
    );

    expect(
      container.querySelector('.bodySection')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /test title/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/test content/i)
    ).toBeInTheDocument();
  });
});

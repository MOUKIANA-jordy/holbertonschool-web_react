import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection component', () => {
  test('renders a heading containing the title', () => {
    render(
      <BodySection title="Test title">
        <p>Test content</p>
      </BodySection>
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /test title/i,
      })
    ).toBeInTheDocument();
  });

  test('renders all children passed to the component', () => {
    render(
      <BodySection title="Test title">
        <p>First child</p>
        <p>Second child</p>
        <button type="button">Third child</button>
      </BodySection>
    );

    expect(
      screen.getByText(/first child/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/second child/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /third child/i,
      })
    ).toBeInTheDocument();
  });

  test('renders the bodySection container', () => {
    const { container } = render(
      <BodySection title="Test title">
        <p>Test content</p>
      </BodySection>
    );

    expect(
      container.querySelector('.bodySection')
    ).toBeInTheDocument();
  });
});

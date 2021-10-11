import React from 'react';
import { render, screen } from './testUtils';
import { MemoryRouter } from 'react-router';
import App from './App';

test('renders No Questions at / when no questions returned', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const noQuestionsText = screen.getByText(/No Questions/i);
  expect(noQuestionsText).toBeInTheDocument();
});

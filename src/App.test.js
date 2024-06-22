import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main app', async () => {
  render(<App />);
  const mainApp = await screen.findByTestId('main-app');
  expect(mainApp).toBeInTheDocument();
});

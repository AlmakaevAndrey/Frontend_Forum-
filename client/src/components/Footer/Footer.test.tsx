import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import theme from '../../styles/theme';
import { ThemeProvider } from 'styled-components';

describe('Footer', () => {
  it('renders Footer with GitHub link and current year', () => {
    render(
      <ThemeProvider theme={theme.darkTheme}>
        <Footer />
      </ThemeProvider>
    );

    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/AlmakaevAndrey');

    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`Almakaev Andrey \\| ${currentYear}`))
    ).toBeInTheDocument();
  });
});

import { ThemeProvider } from 'styled-components';
import MyButton from './Button';
import { render, screen, fireEvent } from '@testing-library/react';
import theme from '../../styles/theme';

describe('MyButton Component', () => {
  const renderWithTheme = (ui: React.ReactNode) =>
    render(<ThemeProvider theme={theme.lightTheme}>{ui}</ThemeProvider>);

  test('renders button with children text', () => {
    renderWithTheme(<MyButton>Click Me</MyButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(<MyButton onClick={handleClick}>Click</MyButton>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled state works', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <MyButton disabled onClick={handleClick}>
        Disabled
      </MyButton>
    );
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

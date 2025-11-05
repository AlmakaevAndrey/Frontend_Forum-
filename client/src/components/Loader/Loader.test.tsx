import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  it('renders without crashing', () => {
    render(<Loader />);
    const svgElement = screen.getByTestId('loader-svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('contains three animated rectangles', () => {
    render(<Loader />);
    const rects = document.querySelectorAll('rect');
    expect(rects.length).toBe(3);

    rects.forEach((rect) => {
      const animate = rect.querySelector('animate');
      expect(animate).not.toBeNull();
      expect(animate?.getAttribute('attributeName')).toBe('opacity');
    });
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Skeleton from './Skeleton';

jest.mock('./Skeleton.styles', () => ({
  List: (props: any) => <div data-testid='list' {...props} />,
  PostCard: (props: any) => <div data-testid='postcard' {...props} />,
  SkeletonTitle: (props: any) => (
    <div data-testid='skeleton-title' {...props} />
  ),
  SkeletonText: (props: any) => <div data-testid='skeleton-text' {...props} />,
}));

describe('Skeleton component', () => {
  it('renders default 5 skeleton posts', () => {
    render(<Skeleton />);

    const list = screen.getByTestId('list');
    expect(list).toBeInTheDocument();

    const posts = screen.getAllByTestId('postcard');
    expect(posts).toHaveLength(5);

    expect(screen.getAllByTestId('skeleton-title')).toHaveLength(5);
    expect(screen.getAllByTestId('skeleton-text')).toHaveLength(5);
  });

  it('renders specified number of skeleton posts', () => {
    render(<Skeleton count={3} />);

    const posts = screen.getAllByTestId('postcard');
    expect(posts).toHaveLength(3);

    expect(screen.getAllByTestId('skeleton-title')).toHaveLength(3);
    expect(screen.getAllByTestId('skeleton-text')).toHaveLength(3);
  });

  it('renders 0 skeletons when count = 0', () => {
    render(<Skeleton count={0} />);
    expect(screen.queryAllByTestId('postcard')).toHaveLength(0);
  });
});

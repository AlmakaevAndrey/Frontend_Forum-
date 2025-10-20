import React from 'react';
import * as S from './Skeleton.styles';

const Skeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <S.List>
      {Array.from({ length: count }).map((_, i) => (
        <S.PostCard key={i}>
          <S.SkeletonTitle />
          <S.SkeletonText />
        </S.PostCard>
      ))}
    </S.List>
  );
};

export default Skeleton;

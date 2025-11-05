import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        data-testid='loader-svg'
        viewBox='0 0 200 200'
      >
        <rect
          fill='#000000'
          stroke='#000000'
          strokeWidth={15}
          width={30}
          height={30}
          x={25}
          y={85}
        >
          <animate
            attributeName='opacity'
            calcMode='spline'
            dur='2s'
            values='1;0;1;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='-0.4s'
          />
        </rect>
        <rect
          fill='#000000'
          stroke='#000000'
          strokeWidth={15}
          width={30}
          height={30}
          x={85}
          y={85}
        >
          <animate
            attributeName='opacity'
            calcMode='spline'
            dur='2s'
            values='1;0;1;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='-0.2s'
          />
        </rect>
        <rect
          fill='#000000'
          stroke='#000000'
          strokeWidth={15}
          width={30}
          height={30}
          x={145}
          y={85}
        >
          <animate
            attributeName='opacity'
            calcMode='spline'
            dur='2s'
            values='1;0;1;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='0s'
          />
        </rect>
      </svg>
    </LoaderWrapper>
  );
};

export default Loader;
// Loader Не рабоетает, при рендере не вопроизводит

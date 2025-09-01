import styled from 'styled-components';

interface LogoProps {
  fillColor?: string;
  reactColor?: string;
}

const StyledSVG = styled.svg`
  rect {
    fill: ${({ theme }) => theme.colors.svg};
  }
`;

export const Logo: React.FC<LogoProps> = () => (
  <StyledSVG
    xmlns="http://www.w3.org/2000/svg"
    width={140}
    height={60}
    viewBox="0 0 520 160"
  >
    <rect x={0} y={16} width={128} height={128} rx={24} fill="#3178C6" />
    <text
      x={64}
      y={104}
      fontFamily="Roboto, sans-serif"
      fontSize={70}
      fontWeight={700}
      textAnchor="middle"
      fill="#000000"
    >
      FF
    </text>
    <g fontFamily="Roboto, sans-serif" fontWeight={800} fill="#000000">
      <text x={168} y={74} fontSize={72}>
        Frontend
      </text>
      <text x={168} y={140} fontSize={72}>
        Forum
      </text>
    </g>
  </StyledSVG>
);

export default Logo;

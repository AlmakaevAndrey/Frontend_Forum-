import styled, { keyframes } from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PostCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

export const SkeletonTitle = styled.div`
  width: 60%;
  height: 20px;
  margin-bottom: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200px 100%;
  animation: ${shine} 1.5s infinite linear;
`;

export const SkeletonText = styled.div`
  width: 100%;
  height: 14px;
  margin-bottom: 4px;
  border-radius: 4px;
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200px 100%;
  animation: ${shine} 1.5s infinite linear;
`;

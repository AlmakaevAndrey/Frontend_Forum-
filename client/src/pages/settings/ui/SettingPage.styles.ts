import styled from 'styled-components';

interface SidebarItemProps {
  $active?: boolean;
}

export const SettingsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 100px;
  background: ${({ theme }) => theme.colors.background || 'f9f9f9'};
  color: ${({ theme }) => theme.colors.text || '#333'};
  transition:
    background 0.3s ease,
    color 0.3s ease;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background || '#fff'};
  border-right: 1px solid ${({ theme }) => theme.colors.border || '#ddd'};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  gap: 10px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#ddd'};
    box-shadow: none;
  }
`;

export const SidebarItem = styled.button<SidebarItemProps>`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.text};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.background || '#f1f1f1'};
    color: ${({ theme }) => theme.colors.textBlack};
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.colors.backgroundInput || '#fff'};
  border-radius: 0 12px 12px 0;
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    border-radius: 0;
    padding: 20px;
  }
`;

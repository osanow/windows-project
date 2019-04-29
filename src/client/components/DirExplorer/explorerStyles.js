import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  border-top: 1px solid #bbb;
  background-color: #fafafa;
  height: 100%;
  width: 100%;
  user-select: none;
`;

export const Navigation = styled.nav`
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const NavOptions = styled.ul`
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  list-style: none;
`;

export const NavOption = styled.li`
  margin: 0 0.3rem;
  height: 1rem;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  pointer-events: ${({ active }) => (active ? 'all' : 'none')};

  & > img {
    -webkit-user-drag: none;
    -moz-user-drag: none;
    filter: ${({ active }) => (active ? 'none' : 'invert(80%)')};
    width: 1.5rem;
    height: 1rem;
  }
`;

export const Main = styled.div`
  position: relative;
  height: calc(100% - 2rem);
  display: flex;
`;

export const Content = styled.div`
  position: relative;
  display: inline-flex;
  overflow-x: auto;
  height: 100%;
  margin: 0;
  border-left: 1px solid #ddd;
`;

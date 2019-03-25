import React from 'react';
import styled from 'styled-components';

import leftArrow from '../../assets/icons/left-arrow.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';
import search from '../../assets/icons/search.svg';
import computer from '../../assets/icons/computer.svg';
import desktop from '../../assets/icons/desktop.svg';

const Wrapper = styled.div`
  position: relative;
  border-top: 1px solid #bbb;
  background-color: #fafafa;
  height: 100%;
  width: 100%;
`;

const Navigation = styled.nav`
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

const NavOptions = styled.ul`
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  list-style: none;
`;

const NavOption = styled.li`
  margin: 0 0.3rem;
  height: 1rem;

  & > img {
    width: 1.5rem;
    height: 1rem;
  }
`;

const PathList = styled.nav`
  width: 100%;
  margin: 0 0.3rem;
  height: 1.3rem;
  border: 1px solid #ccc;
`;

const SearchBox = styled.input`
  position: relative;
  margin: 0 0.3rem;
  padding: 0.1rem 0.3rem;
  padding-right: 2rem;
  height: 1.3rem;
  font-size: 12px;
  width: 18rem;
  border: 1px solid #ccc;

  & + img {
    position: absolute;
    filter: invert(50%);
    width: 1rem;
    height: 1rem;
    right: 0.5rem;
  }
`;

const Main = styled.div`
  position: relative;
  height: calc(100% - 2rem);
  width: 100%;
  display: flex;
`;

const Sidebar = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 20%;
  height: 100%;
  min-width: 7rem;
  max-width: 12rem;
  list-style: none;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  border-right: 1px solid #eee;
  overflow: hidden;
`;

const SidebarItem = styled.li`
  position: relative;
  padding-left: 1rem;
  width: 100%;
  margin-top: 0.3rem;
  font-size: 13px;

  & + ul {
    height: ${({ active }) => (active ? 'auto' : '0px')};
  }

  &::before {
    position: absolute;
    content: url(${({ icon }) => icon});
    left: -0.5rem;
    width: 1rem;
    height: 1rem;
  }
`;

const ItemsList = styled.ul`
  list-style: none;
  padding-left: 0.5rem;
  overflow: hidden;
`;

const Content = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
  padding: 0 1rem;
  margin: 0 0.5rem;
`;

const explorer = (props) => {
  const { dirName } = props;
  return (
    <Wrapper>
      <Navigation>
        <NavOptions>
          <NavOption>
            <img src={leftArrow} alt="prev" />
          </NavOption>
          <NavOption>
            <img src={rightArrow} alt="next" />
          </NavOption>
        </NavOptions>
        <PathList />
        <SearchBox placeholder={`Przeszukaj: ${dirName}`} />
        <img src={search} alt="search" />
      </Navigation>
      <Main>
        <Sidebar>
          <SidebarItem icon={computer} active="true">
            Computer
          </SidebarItem>
          <ItemsList>
            <SidebarItem icon={desktop}> Desktop </SidebarItem>
            <ItemsList>
              <SidebarItem icon={desktop}> Desktop </SidebarItem>
            </ItemsList>
          </ItemsList>
        </Sidebar>
        <Content />
      </Main>
    </Wrapper>
  );
};

export default React.memo(explorer);

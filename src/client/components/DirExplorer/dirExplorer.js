import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../axios-instance';

import leftArrow from '../../assets/icons/left-arrow.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';
import search from '../../assets/icons/search.svg';
import { updateObject, asyncForEach } from '../../utils/utility';

import RectangleSpinner from '../Spinners/rectangleSpinner';
import DirItems from './dirItems/dirItems';
import PathList from './pathList';
import Sidebar from './sidebar/sidebar';

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
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};

  & > img {
    filter: ${({ active }) => (active ? 'none' : 'invert(80%)')};
    width: 1.5rem;
    height: 1rem;
  }
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
  display: flex;
`;

const Content = styled.div`
  position: relative;
  display: inline-flex;
  overflow-x: scroll;
  height: 100%;
  margin: 0;
`;

const explorer = (props) => {
  const { dirName, initPath, initDisplayPath } = props;
  const [data, setData] = useState({
    items: null,
    history: {
      position: 1,
      data: [
        {
          path: [initPath.substring(1).split('/')[0]],
          displayPath: [initDisplayPath.substring(1).split('/')[0]]
        },
        {
          path: initPath.substring(1).split('/'),
          displayPath: initDisplayPath.substring(1).split('/')
        }
      ]
    }
  });

  const { history, items } = data;
  const currData = history.data[history.position];

  const fetchItems = async () => {
    console.log(currData);
    const fetchedItems = (await axios('items/', {
      method: 'GET',
      params: {
        path: `/${currData.path.join('/')}`
      }
    })).data;

    const icons = {};
    const newItems = [];
    await asyncForEach(fetchedItems, async (item) => {
      if (!icons[item.icon]) {
        icons[item.icon] = (await import(`../../assets/icons/${
          item.icon
        }`)).default;
      }
      newItems.push({
        ...item,
        iconPath: icons[item.icon]
      });
    });

    setData(updateObject(data, { items: newItems }));
  };

  const navigate = (value) => {
    if (value === 0) return;
    setData({
      items: null,
      history: {
        position: history.position + value,
        data: history.data
      }
    });
  };

  useEffect(() => {
    fetchItems();
  }, [data.history.position]);

  const allowPrev = history.position > 0;
  const allowNext = history.position < history.data.length - 1;
  return (
    <Wrapper data-type="container" data-path={`/${currData.path.join('/')}`}>
      <Navigation>
        <NavOptions>
          <NavOption
            active={allowPrev}
            onClick={() => allowPrev && navigate(-1)}
          >
            <img src={leftArrow} alt="prev" />
          </NavOption>
          <NavOption
            active={allowNext}
            onClick={() => allowNext && navigate(1)}
          >
            <img src={rightArrow} alt="next" />
          </NavOption>
        </NavOptions>
        <PathList path={currData.displayPath} navigateHandler={navigate} />
        <>
          <SearchBox placeholder={`Search in: ${dirName}`} />
          <img src={search} alt="search" />
        </>
      </Navigation>
      <Main>
        <Sidebar />
        {items === null ? (
          <RectangleSpinner
            style={{
              margin: '15% 15%',
              opacity: '0.5'
            }}
          />
        ) : (
          <Content>
            <DirItems items={items} />
          </Content>
        )}
      </Main>
    </Wrapper>
  );
};

export default React.memo(explorer);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import { openApp, appFetchItems } from '../../store/actions/index';

import leftArrow from '../../assets/icons/left-arrow.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';
import search from '../../assets/icons/search.svg';

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
  user-select: none;
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
  pointer-events: ${({ active }) => (active ? 'all' : 'none')};

  & > img {
    -webkit-user-drag: none;
    -moz-user-drag: none;
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
  overflow-x: auto;
  height: 100%;
  margin: 0;
`;

const explorer = (props) => {
  const { dirName, initPath, initDisplayPath } = props;
  const [data, setData] = useState({
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

  const { history } = data;
  const { items, loading, id } = props;
  const currData = history.data[history.position];

  const navigate = (value) => {
    if (value === 0) return;
    setData({
      history: {
        position: history.position + value,
        data: history.data
      }
    });
  };

  const changeDir = (dirId, name) => {
    if (dirId === currData.path[currData.path.length - 1]) return;

    let newPath = currData.path.concat(dirId);
    let newDisplayPath = currData.displayPath.concat(name);

    const duplicate = currData.path.findIndex(itemId => itemId === dirId);
    if (duplicate !== -1) {
      newPath = newPath.slice(0, duplicate).concat(dirId);
      newDisplayPath = newDisplayPath.slice(0, duplicate).concat(name);
    }
    setData({
      history: {
        position: history.data.slice(0, history.position).length + 1,
        data: history.data.slice(0, history.position + 1).concat({
          path: newPath,
          displayPath: newDisplayPath
        })
      }
    });
  };

  useEffect(() => {
    const { appFetchItemsHandler } = props;
    appFetchItemsHandler(`/${currData.path.join('/')}`, id);
  }, [data.history.position]);

  const allowPrev = history.position > 0;
  const allowNext = history.position < history.data.length - 1;
  return (
    <Wrapper
      data-type="container"
      data-path={`/${currData.path.join('/')}`}
      id={currData.path.toString() === 'Desktop' ? 'Desktop' : id}
    >
      <Navigation>
        <NavOptions>
          <NavOption
            active={allowPrev}
            onClick={_.throttle(() => navigate(-1), 800)}
          >
            <img src={leftArrow} alt="prev" />
          </NavOption>
          <NavOption
            active={allowNext}
            onClick={_.throttle(() => navigate(1), 800)}
          >
            <img src={rightArrow} alt="next" />
          </NavOption>
        </NavOptions>
        <PathList
          displayPath={currData.displayPath}
          path={currData.path}
          changeDir={changeDir}
        />
        <>
          <SearchBox placeholder={`Search in: ${dirName}`} />
          <img src={search} alt="search" />
        </>
      </Navigation>
      <Main>
        <Sidebar />
        {loading ? (
          <RectangleSpinner
            style={{
              margin: '15% 15%',
              opacity: '0.5'
            }}
          />
        ) : (
          <Content>
            <DirItems items={items} changeDirHandler={changeDir} />
          </Content>
        )}
      </Main>
    </Wrapper>
  );
};

const mapStateToProps = (state, ownProps) => {
  const data = state.apps.data[ownProps.id];
  const items = null;
  const loading = false;
  if (data) {
    return {
      items: data.items,
      loading: data.loading
    };
  }
  return { items, loading };
};

const mapDispatchToProps = dispatch => ({
  openAppHandler: (app, event, runningAppsAmount) => dispatch(openApp(app, event, runningAppsAmount)),
  appFetchItemsHandler: (path, id) => dispatch(appFetchItems(path, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(explorer));

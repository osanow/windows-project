import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import axios from '../../axios-instance';
import { openApp, appFetchItems } from '../../store/actions/index';
import SearchBox from './searchBox';

import * as Styles from './explorerStyles';
import leftArrow from '../../assets/icons/left-arrow.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';

import RectangleSpinner from '../Spinners/rectangleSpinner';
import DirItems from './dirItems/dirItems';
import PathList from './pathList';
import Sidebar from './sidebar/sidebar';
import { updateObject, fetchIcons } from '../../utils/utility';

const explorer = (props) => {
  const {
    dirName,
    initPath,
    initDisplayPath,
    allItemsData,
    appFetchItemsHandler
  } = props;

  const [data, setData] = useState({
    searchedItems: null,
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
  const currData = history.data[history.position];

  useEffect(() => {
    appFetchItemsHandler(`/${currData.path.join('/')}`);
  }, [history.position]);

  const currItemsData = allItemsData[`/${currData.path.join('/')}`] || {
    loading: false,
    items: []
  };
  const { loading } = currItemsData;

  const navigate = (value) => {
    if (value === 0) return;
    setData({
      searchedItems: null,
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
      searchedItems: null,
      history: {
        position: history.data.slice(0, history.position).length + 1,
        data: history.data.slice(0, history.position + 1).concat({
          path: newPath,
          displayPath: newDisplayPath
        })
      }
    });
  };

  const onDoubleClickHandler = (item) => {
    if (item.props.type.find(type => type === 'directory')) {
      const { _id, name } = item.props;
      changeDir(_id, name);
      return;
    }
    const { openAppHandler } = props;
    openAppHandler(item);
  };

  const debouncedSearchHandler = _.debounce((value) => {
    if (value === '') {
      setData(updateObject(data, { searchedItems: null }));
      return;
    }
    axios
      .get('/items', {
        params: {
          path: `/${currData.path.join('/')}`,
          name: value
        }
      })
      .then(async (response) => {
        const items = await fetchIcons(response.data);
        setData(updateObject(data, { searchedItems: items }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, 500);

  const allowPrev = history.position > 0;
  const allowNext = history.position < history.data.length - 1;

  return (
    <Styles.Wrapper
      data-type="container"
      data-path={`/${currData.path.join('/')}`}
      data-name={currData.displayPath.join('/')}
    >
      <Styles.Navigation>
        <Styles.NavOptions>
          <Styles.NavOption
            active={allowPrev}
            onClick={_.throttle(() => navigate(-1), 800)}
          >
            <img src={leftArrow} alt="prev" />
          </Styles.NavOption>
          <Styles.NavOption
            active={allowNext}
            onClick={_.throttle(() => navigate(1), 800)}
          >
            <img src={rightArrow} alt="next" />
          </Styles.NavOption>
        </Styles.NavOptions>
        <PathList
          displayPath={currData.displayPath}
          path={currData.path}
          changeDir={changeDir}
        />
        <SearchBox
          dirName={dirName}
          debouncedSearchHandler={debouncedSearchHandler}
        />
      </Styles.Navigation>
      <Styles.Main>
        <Sidebar />
        {loading && currItemsData.items.length < 1 ? (
          <RectangleSpinner
            style={{
              margin: '15% 15%',
              opacity: '0.5'
            }}
          />
        ) : (
          <Styles.Content>
            <DirItems
              items={
                (data.searchedItems !== null && data.searchedItems)
                || currItemsData.items
              }
              onDoubleClickHandler={onDoubleClickHandler}
              updateItems={() => appFetchItemsHandler(`/${currData.path.join('/')}`)
              }
            />
          </Styles.Content>
        )}
      </Styles.Main>
    </Styles.Wrapper>
  );
};

const mapStateToProps = state => ({
  allItemsData: state.apps.data
});

const mapDispatchToProps = dispatch => ({
  openAppHandler: app => dispatch(openApp(app)),
  appFetchItemsHandler: path => dispatch(appFetchItems(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(explorer));

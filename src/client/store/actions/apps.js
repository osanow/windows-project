import React from 'react';
import * as actionTypes from './actionTypes';

import axios from '../../axios-instance';
import { fetchIcons } from '../../utils/utility';

export const focusApp = id => ({
  type: actionTypes.APP_FOCUS,
  id
});

export const appStartFetchingItems = path => ({
  type: actionTypes.APP_START_FETCHING_ITEMS,
  path
});

export const appFetchItems = path => async (dispatch) => {
  dispatch(appStartFetchingItems(path));

  const fetchedItems = (await axios('items/', {
    method: 'GET',
    params: { path }
  })).data;
  const newItems = await fetchIcons(fetchedItems);
  dispatch({
    type: actionTypes.APP_FETCH_ITEMS,
    path,
    newItems
  });
};

export const startOpeningApp = () => ({
  type: actionTypes.APP_START_OPENING
});

export const openApp = app => async (dispatch) => {
  if (document.getElementById(`Window${app.props._id}`)) {
    focusApp(app.props._id);
    return;
  }
  dispatch(startOpeningApp());

  let OpenedApp;
  const SystemWindow = (await import('../../components/SystemWindow/systemWindow'))
    .default;
  if (app.props.type.find(type => type === 'file')) {
    const TextEditor = (await import('../../components/TextEditor/textEditor'))
      .default;
    OpenedApp = (left, top) => (
      <SystemWindow
        key={app.props._id}
        _id={app.props._id}
        name={app.props.name}
        path={app.props.path}
        icon={app.props.iconPath}
        type={app.props.type}
        left={left}
        top={top}
      >
        <TextEditor
          value={app.props.content}
          updateItems={app.props.updateItems}
          itemId={app.props._id}
        />
      </SystemWindow>
    );
  } else if (app.props.type.find(type => type === 'container')) {
    const DirExplorer = (await import('../../components/DirExplorer/dirExplorer'))
      .default;
    OpenedApp = (left, top) => (
      <SystemWindow
        key={app.props._id}
        _id={app.props._id}
        name={`${app.props.path}/${app.props.name}`}
        path={app.props.path}
        icon={app.props.iconPath}
        type={app.props.type}
        left={left}
        top={top}
      >
        <DirExplorer
          id={app.props._id}
          dirName={app.props.name}
          initPath={`${app.props.path}/${app.props._id}`}
          initDisplayPath={`${app.props.path}/${app.props.name}`}
        />
      </SystemWindow>
    );
  }
  setTimeout(() => {
    dispatch({
      type: actionTypes.APP_OPEN,
      OpenedApp
    });
  }, 100);
};

export const closeApp = id => ({
  type: actionTypes.APP_CLOSE,
  id
});

export const hideApp = (hiddenApp) => {
  console.log('hide');
  return {
    type: actionTypes.APP_HIDE,
    hiddenApp
  };
};

export const showApp = () => ({
  type: actionTypes.APP_SHOW
});

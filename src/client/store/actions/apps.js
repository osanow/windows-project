import React from 'react';
import * as actionTypes from './actionTypes';

import axios from '../../axios-instance';
import { asyncForEach } from '../../utils/utility';
import noIcon from '../../assets/icons/noIcon.png';

export const startOpeningApp = () => ({
  type: actionTypes.APP_START_OPENING
});

export const focusApp = id => ({
  type: actionTypes.APP_FOCUS,
  id
});

export const appStartFetchingItems = id => ({
  type: actionTypes.APP_START_FETCHING_ITEMS,
  id
});

export const appFetchItems = (path, id) => async (dispatch) => {
  dispatch(appStartFetchingItems(id));

  const fetchedItems = (await axios('items/', {
    method: 'GET',
    params: { path }
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
  document.body.style.cursor = 'default';
  dispatch({
    type: actionTypes.APP_FETCH_ITEMS,
    id,
    newItems
  });
};

export const openApp = (app, event, activeAppsAmount) => async (dispatch) => {
  if (document.getElementById(`Window${app.props._id}`)) {
    focusApp(app.props._id);
    return;
  }

  dispatch(startOpeningApp());

  let openedApp;
  let appIcon;
  try {
    appIcon = (await import(`../../assets/icons/${app.props.icon}`)).default;
  } catch (err) {
    appIcon = noIcon;
  }
  const SystemWindow = (await import('../../components/SystemWindow/systemWindow'))
    .default;
  if (app.props.type.find(type => type === 'file')) {
    const TextEditor = (await import('../../components/TextEditor/textEditor'))
      .default;
    openedApp = (
      <SystemWindow
        key={app.props._id}
        sourceX={`${event.clientX}px`}
        sourceY={`${event.clientY}px`}
        left={`10rem + ${1.5 * (activeAppsAmount % 6)
          + 5 * Math.floor(activeAppsAmount / 6)}rem`}
        top={`3rem + ${1.5 * (activeAppsAmount % 6)}rem`}
        _id={app.props._id}
        name={app.state.displayName}
        path={app.props.path}
        icon={appIcon}
        type={app.props.type}
      >
        <TextEditor
          value={app.props.content}
          updateDesktopIcon={app.props.updateIcon}
          itemId={app.props._id}
        />
      </SystemWindow>
    );
  } else if (app.props.type.find(type => type === 'directory')) {
    const DirExplorer = (await import('../../components/DirExplorer/dirExplorer'))
      .default;
    openedApp = (
      <SystemWindow
        key={app.props._id}
        sourceX={`${event.clientX}px`}
        sourceY={`${event.clientY}px`}
        left={`10rem + ${1.5 * (activeAppsAmount % 6)
          + 5 * Math.floor(activeAppsAmount / 6)}rem`}
        top={`3rem + ${1.5 * (activeAppsAmount % 6)}rem`}
        _id={app.props._id}
        name={`${app.props.path}/${app.state.displayName}`}
        path={app.props.path}
        icon={appIcon}
        type={app.props.type}
      >
        <DirExplorer
          id={app.props._id}
          dirName={app.state.displayName}
          initPath={`${app.props.path}/${app.props._id}`}
          initDisplayPath={`${app.props.path}/${app.state.displayName}`}
        />
      </SystemWindow>
    );
  }
  setTimeout(() => {
    dispatch({
      type: actionTypes.APP_OPEN,
      openedApp
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

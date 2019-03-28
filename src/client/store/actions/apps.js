import React from 'react';
import * as actionTypes from './actionTypes';

export const startOpeningApp = () => ({
  type: actionTypes.APP_START_OPENING
});

export const focusApp = id => ({
  type: actionTypes.APP_FOCUS,
  id
});

export const openApp = (app, event, activeAppsAmount) => async (dispatch) => {
  dispatch(startOpeningApp());

  let openedApp;
  const appIcon = (await import(`../../assets/icons/${app.props.type[0]}.svg`))
    .default;
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

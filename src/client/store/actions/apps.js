import React from 'react';
import * as actionTypes from './actionTypes';

export const startOpeningApp = () => ({
  type: actionTypes.APP_START_OPENING
});

export const openApp = (app, event, activeAppsAmount) => async (dispatch) => {
  console.log(app, event, activeAppsAmount);
  dispatch(startOpeningApp());

  let openedApp;
  const appIcon = (await import(`../../assets/icons/${app.props.type[0]}.png`)).default;
  const SystemWindow = (await import('../../components/SystemWindow/systemWindow')).default;
  if (app.props.type.find(type => type === 'file')) {
    const TextEditor = (await import('../../components/TextEditor/textEditor')).default;
    openedApp = (
      <SystemWindow
        key={app.props._id}
        sourceX={event.clientX+'px'}
        sourceY={event.clientY+'px'}
        left={`20vh + ${3*(activeAppsAmount%6)+3*(Math.floor(activeAppsAmount/6))}vh`}
        top={`10vh + ${3*(activeAppsAmount%6)+3*(Math.floor(activeAppsAmount/6))}vh`}
      
        name={app.props.name}
        path={app.props.path}
        icon={appIcon}
        type={app.props.type}
      >
        <TextEditor value={app.props.content} itemId={app.props._id} />
      </SystemWindow>
    );
  }
  setTimeout(() => { // for visual effects :)
    dispatch({
      type: actionTypes.APP_OPEN,
      openedApp
    });
  }, 400);
};

export const closeApp = () => ({
  type: actionTypes.APP_CLOSE
});

export const maximalizeApp = () => ({
  type: actionTypes.APP_MAXIMALIZE
});

export const hideApp = () => ({
  type: actionTypes.APP_HIDE
});

export const showApp = () => ({
  type: actionTypes.APP_SHOW
});

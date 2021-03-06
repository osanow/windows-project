import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  running: [],
  minimalized: [],
  data: {},
  loading: false,
  error: false
};

const appStartFetchingItems = (state, action) => updateObject(state, {
  data: {
    ...state.data,
    [action.path]: {
      items: [],
      ...updateObject(state.data[action.path], {
        loading: true
      })
    }
  }
});

const appFetchItems = (state, action) => updateObject(state, {
  data: {
    ...state.data,
    [action.path]: {
      items: action.newItems,
      loading: false
    }
  }
});

const appStartOpening = state => updateObject(state, { loading: true });

const openApp = (state, { OpenedApp }) => {
  const activeAppsAmount = state.running.length;
  const left = `10rem + ${1.5 * (activeAppsAmount % 6)
    + 5 * Math.floor(activeAppsAmount / 6)}rem`;
  const top = `3rem + ${1.5 * (activeAppsAmount % 6)}rem`;

  const newOpenedApp = OpenedApp(left, top);

  return updateObject(state, {
    loading: false,
    running: state.running.concat([newOpenedApp])
  });
};

const closeApp = (state, { id }) => updateObject(state, {
  running: state.running.filter(app => app.props._id !== id),
  error: false
});

const focusApp = (state, { id }) => {
  const focusedApp = state.running.length > 0 && state.running.find(app => app.props._id === id);
  if (!focusedApp) return state;
  return updateObject(state, {
    running: state.running
      .filter(app => app.props._id !== id)
      .concat([focusedApp])
  });
};

const hideApp = (state, { hiddenApp }) => updateObject(state, {
  minimalized: state.minimalized.concat([hiddenApp]),
  running: state.running.filter(app => app.props._id !== hiddenApp.props._id)
});

const showApp = (state, { id }) => {
  const app = state.minimalized.find(el => el.props._id === id);
  return updateObject(state, {
    minimalized: state.minimalized.filter(el => el.props._id !== id),
    running: state.running.concat([app])
  });
};

const errorApp = (state, { message }) => {
  console.log(message);
  return updateObject(state, {
    error: message,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_FETCHING_ITEMS:
      return appStartFetchingItems(state, action);
    case actionTypes.APP_FETCH_ITEMS:
      return appFetchItems(state, action);
    case actionTypes.APP_START_OPENING:
      return appStartOpening(state);
    case actionTypes.APP_OPEN:
      return openApp(state, action);
    case actionTypes.APP_CLOSE:
      return closeApp(state, action);
    case actionTypes.APP_FOCUS:
      return focusApp(state, action);
    case actionTypes.APP_START_HIDING:
      return state; // temp
    case actionTypes.APP_HIDE:
      return hideApp(state, action);
    case actionTypes.APP_SHOW:
      return showApp(state, action);
    case actionTypes.APP_ERROR:
      return errorApp(state, action);
    default:
      return state;
  }
};

export default reducer;

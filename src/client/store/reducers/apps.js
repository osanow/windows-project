import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  running: [],
  minimalized: [],
  data: {},
  loading: false
};

const appStartFetchingItems = (state, action) => updateObject(state, {
  data: {
    ...state.data,
    [action.path]: updateObject(state.data[action.path], {
      loading: true
    })
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

const openApp = (state, { openedApp }) => updateObject(state, {
  loading: false,
  running: state.running.concat([openedApp])
});

const closeApp = (state, { id }) => updateObject(state, {
  running: state.running.filter(app => app.props._id !== id)
});

const focusApp = (state, { id }) => {
  const focusedApp = state.running.find(app => app.props._id === id);
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
    case actionTypes.APP_HIDE:
      return hideApp(state, action);
    case actionTypes.APP_SHOW:
    default:
      return state;
  }
};

export default reducer;

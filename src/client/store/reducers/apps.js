import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  running: [],
  minimalized: [],
  loading: false
};

const appStartOpening = state => updateObject(state, { loading: true });

const openApp = (state, { openedApp }) => updateObject(state, {
  loading: false,
  running: state.running.concat([openedApp])
});

const focusApp = (state, { id }) => {
  const focusedApp = state.running.find(app => app.props._id === id);
  console.log(
    state.running,
    state.running.filter(app => app.props._id !== id),
    state.running.filter(app => app.props._id !== id).concat([focusedApp])
  );
  return updateObject(state, {
    running: state.running
      .filter(app => app.props._id !== id)
      .concat([focusedApp])
  });
};

const closeApp = (state, { id }) => updateObject(state, {
  running: state.running.filter(app => app.props._id !== id)
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_OPENING:
      return appStartOpening(state);
    case actionTypes.APP_OPEN:
      return openApp(state, action);
    case actionTypes.APP_CLOSE:
      return closeApp(state, action);
    case actionTypes.APP_FOCUS:
      return focusApp(state, action);
    case actionTypes.APP_HIDE:
    case actionTypes.APP_SHOW:
    default:
      return state;
  }
};

export default reducer;

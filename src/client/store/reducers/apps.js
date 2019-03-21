import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  running: [],
  minimalized: [],
  loading: false
};

const appStartOpening = state => updateObject(state, { loading: true });

const openApp = (state, action) => ({
  ...state,
  loading: false,
  running: state.running.concat([action.openedApp])
});

const closeApp = (state, action) => updateObject(state, {
  running: state.running.filter((app) => {
    console.log(app.props._id, action.id);
    return app.props._id !== action.id;
  })
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_OPENING:
      return appStartOpening(state);
    case actionTypes.APP_OPEN:
      return openApp(state, action);
    case actionTypes.APP_CLOSE:
      return closeApp(state, action);
    case actionTypes.APP_MAXIMALIZE:
    case actionTypes.APP_HIDE:
    case actionTypes.APP_SHOW:
    default:
      return state;
  }
};

export default reducer;

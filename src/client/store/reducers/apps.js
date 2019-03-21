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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_OPENING:
      return appStartOpening(state);
    case actionTypes.APP_OPEN:
      return openApp(state, action);
    case actionTypes.APP_CLOSE:
    case actionTypes.APP_MAXIMALIZE:
    case actionTypes.APP_HIDE:
    case actionTypes.APP_SHOW:
    default:
      return state;
  }
};

export default reducer;

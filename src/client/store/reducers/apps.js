import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  running: [],
  minimalized: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_OPEN:
    case actionTypes.APP_CLOSE:
    case actionTypes.APP_MAXIMALIZE:
    case actionTypes.APP_HIDE:
    case actionTypes.APP_SHOW:
    default:
      return state;
  }
};

export default reducer;

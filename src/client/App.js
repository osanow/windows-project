import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { onContextMenu } from './utils/itemsUtil';
import { authCheckState } from './store/actions/index';
import Toolbar from './containers/Toolbar/Toolbar';
import Desktop from './containers/Desktop/Desktop';
import AppLoader from './components/AppLoader/appLoader';
import AuthLayer from './containers/AuthLayer/AuthLayer';

import './app.css';

const root = ({ isAuth, onTryAutoSignup }) => {
  const [appLoader, setAppLoader] = useState(true);

  useEffect(() => {
    onTryAutoSignup();
  }, []);

  const authLoadedHandler = () => {
    setAppLoader(false);
  };

  window.oncontextmenu = onContextMenu;

  return (
    <>
      <Desktop />
      <Toolbar />
      <AuthLayer
        closed={isAuth}
        disableLoadingPageHandler={authLoadedHandler}
      />
      <AppLoader closed={!appLoader} />
    </>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(authCheckState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(root);

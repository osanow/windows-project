import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/auth';
import Toolbar from './containers/Toolbar/Toolbar';
import Desktop from './containers/Desktop/Desktop';
import AppLoader from './components/AppLoader/appLoader';
import AuthLayer from './containers/AuthLayer/AuthLayer';

import './app.css';

const root = (props) => {
  const [appLoader, setAppLoader] = useState(true);

  useEffect(() => {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }, []);

  const authLoadedHandler = () => {
    setAppLoader(false);
  };

  const { isAuth } = props;

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
  isAuth: state.token !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(authCheckState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(root);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  auth, authLoginFail, authSigninFail, appError
} from '../../store/actions/index';
import Spinner from '../../components/Spinners/dottedSpinner';
import Input from '../../components/UI/Input/input';
import arrowIcon from '../../assets/icons/right-arrow.svg';
import { updateObject, checkValidity } from '../../utils/utility';
import {
  Container,
  Wrapper,
  AvatarWrapper,
  Avatar,
  Title,
  Form,
  Button,
  Hint
} from './styles';

class AuthLayer extends Component {
  state = {
    loginMode: true,
    backgroundUrl: null,
    loginFormConfig: {
      email: {
        inputConfig: {
          type: 'email',
          placeholder: 'E-mail',
          value: '',
          valid: false,
          touched: false
        },
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        inputConfig: {
          type: 'password',
          placeholder: 'Password',
          value: '',
          valid: false,
          touched: false
        },
        validation: {
          required: true,
          minLength: 6
        }
      }
    },
    signinFormConfig: {
      email: {
        inputConfig: {
          type: 'email',
          placeholder: 'E-mail *',
          value: '',
          valid: false,
          touched: false
        },
        validation: {
          required: true,
          isEmail: true
        }
      },
      passwordFirst: {
        inputConfig: {
          type: 'password',
          placeholder: 'Password *',
          value: '',
          valid: false,
          touched: false
        },
        validation: {
          required: true,
          minLength: 6
        }
      },
      passwordSec: {
        inputConfig: {
          type: 'password',
          placeholder: 'Password *',
          value: '',
          valid: false,
          touched: false
        },
        validation: {
          required: true,
          minLength: 6
        }
      },
      username: {
        inputConfig: {
          type: 'text',
          placeholder: 'Your name',
          value: '',
          valid: true,
          touched: false
        },
        validation: {
          required: false
        }
      }
    }
  };

  componentDidMount() {
    const { disableLoadingPageHandler, onAppError } = this.props;

    axios
      .get(
        'https://api.unsplash.com/photos/random/?client_id=595801d981b62e6549e983610e2ebb1d42f54b245d427ce465ff6d5fe4439df5&query=nature&orientation=landscape&count=1'
      )
      .then(res => this.setState(prevState => updateObject(prevState, { backgroundUrl: res.data[0].urls.regular })))
      .then(() => {
        disableLoadingPageHandler();
        console.log('HQ background');
      })
      .catch((err) => {
        if (err.message.includes('Network')) {
          onAppError(`Error type: ${err.message}`);
        } else {
          console.log('Low quality background due to too much queries :c');
          return this.setState(prevState => updateObject(prevState, {
            backgroundUrl:
                'https://source.unsplash.com/random/2000×1400/?nature'
          }), () => disableLoadingPageHandler());
        }
      });
  }

  checkValidityForm = (loginMode) => {
    const { loginFormConfig, signinFormConfig } = this.state;
    let isValid = true;

    Object.entries(loginMode ? loginFormConfig : signinFormConfig).forEach(
      (formItem) => {
        const configData = formItem[1].inputConfig;
        if (!configData.valid) isValid = false;
      }
    );

    return isValid;
  };

  touchFormFields = (loginMode) => {
    const { loginFormConfig, signinFormConfig } = this.state;
    const currFormConfig = loginMode ? loginFormConfig : signinFormConfig;

    const updatedConfig = {};

    Object.entries(currFormConfig).forEach((formItem) => {
      updatedConfig[formItem[0]] = {
        ...currFormConfig[formItem[0]],
        inputConfig: {
          ...currFormConfig[formItem[0]].inputConfig,
          touched: currFormConfig[formItem[0]].validation.required
        }
      };
    });

    if (loginMode) this.setState({ loginFormConfig: updatedConfig });
    else this.setState({ signinFormConfig: updatedConfig });
  };

  submitHandler = (e) => {
    const { loginMode, loginFormConfig, signinFormConfig } = this.state;
    const {
      failedLoginAuth, failedSigninAuth, onAuth, loading
    } = this.props;

    if (loading) return;

    e.preventDefault();

    const isValid = this.checkValidityForm(loginMode);
    if (!isValid) {
      if (loginMode) failedLoginAuth('Invalid user data!');
      else failedSigninAuth('Invalid user data!');
      this.touchFormFields(loginMode);
      return;
    }

    if (loginMode) {
      onAuth(
        loginFormConfig.email.inputConfig.value,
        loginFormConfig.password.inputConfig.value,
        loginMode,
        null
      );
    } else {
      if (
        signinFormConfig.passwordFirst.inputConfig.value
        !== signinFormConfig.passwordSec.inputConfig.value
      ) {
        failedSigninAuth('Passwords are not equal!');
        this.touchFormFields(loginMode);
        return;
      }

      onAuth(
        signinFormConfig.email.inputConfig.value,
        signinFormConfig.passwordFirst.inputConfig.value,
        loginMode,
        signinFormConfig.username.inputConfig.value
      );
    }
  };

  changeModeHandler = () => {
    this.setState(prevState => updateObject(prevState, { loginMode: !prevState.loginMode }));
  };

  inputChangedHandler = (e, inputId) => {
    const { loginFormConfig, signinFormConfig, loginMode } = this.state;
    const currFormConfig = loginMode ? loginFormConfig : signinFormConfig;

    const updatedConfig = updateObject(currFormConfig, {
      [inputId]: updateObject(currFormConfig[inputId], {
        inputConfig: updateObject(currFormConfig[inputId].inputConfig, {
          value: e.target.value,
          valid: checkValidity(
            e.target.value,
            currFormConfig[inputId].validation
          ),
          touched: true
        })
      })
    });

    if (loginMode) this.setState({ loginFormConfig: updatedConfig });
    else this.setState({ signinFormConfig: updatedConfig });
  };

  render() {
    const {
      backgroundUrl,
      loginMode,
      loginFormConfig,
      signinFormConfig
    } = this.state;

    const {
      loading, loginError, signinError, closed
    } = this.props;

    const loginForm = Object.entries(loginFormConfig).map(formItem => (
      <Input
        key={`loginForm ${formItem[0]}`}
        inputConfig={formItem[1].inputConfig}
        changeHandler={e => this.inputChangedHandler(e, formItem[0])}
      />
    ));

    const signinForm = Object.entries(signinFormConfig).map(formItem => (
      <Input
        key={`signinForm ${formItem[0]}`}
        inputConfig={formItem[1].inputConfig}
        changeHandler={e => this.inputChangedHandler(e, formItem[0])}
        spellCheck="false"
      />
    ));

    return (
      <Container closed={closed} bGround={backgroundUrl}>
        <Wrapper>
          <AvatarWrapper>
            <Avatar />
          </AvatarWrapper>
          <Title loginMode={loginMode} />
          <Form
            onSubmit={this.submitHandler}
            error={loginMode ? loginError : signinError}
          >
            {loginMode ? loginForm : signinForm}
            <Button>
              {loading ? <Spinner /> : <img src={arrowIcon} alt="Continue" />}
            </Button>
          </Form>
          {loginMode ? (
            <Hint onClick={this.changeModeHandler}>
              You dont have <span style={{ color: '#85a4e2' }}> account </span>{' '}
              yet?
            </Hint>
          ) : (
            <Hint onClick={this.changeModeHandler}>
              I already have <span style={{ color: '#85a4e2' }}> account </span>
            </Hint>
          )}
        </Wrapper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loginError: state.auth.loginError,
  signinError: state.auth.signinError
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
  failedLoginAuth: err => dispatch(authLoginFail(err)),
  failedSigninAuth: err => dispatch(authSigninFail(err)),
  onAppError: message => dispatch(appError(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AuthLayer));

import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../../components/Spinners/dottedSpinner';
import Input from '../../components/UI/Input/input';
import arrowIcon from '../../assets/icons/right-arrow.svg';
import { updateObject, checkValidity } from '../../utils/utility';
import {
  Container, Wrapper, AvatarWrapper, Avatar, Title, Form, Button, Hint
} from './styles';

class AuthLayer extends Component {
  state = {
    loginMode: true,
    backgroundUrl: null,
    loading: false,
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
      passwordFirst: {
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
      },
      passwordSec: {
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
      },
      username: {
        inputConfig: {
          type: 'text',
          placeholder: 'Your name',
          value: '',
          valid: false,
          touched: false
        },
        validation: {
          required: false
        }
      },
    }
  };

  componentDidMount() {
    const { disableLoadingPageHandler } = this.props;

    axios
      .get(
        'https://api.unsplash.com/photos/random/?client_id=595801d981b62e6549e983610e2ebb1d42f54b245d427ce465ff6d5fe4439df5&query=nature&orientation=landscape&count=1'
      )
      .then(res => this.setState(prevState => updateObject(prevState, { backgroundUrl: res.data[0].urls.regular })))
      .then(() => {
        console.log('HQ background');
        disableLoadingPageHandler();
      })
      .catch((err) => {
        if (err.message.includes('network')) {
          alert('Check your internet connection!');
        } else {
          console.log('Low quality background due to too much queries :c');
          disableLoadingPageHandler();
          this.setState(prevState => updateObject(prevState, {
            backgroundUrl:
                'https://source.unsplash.com/random/2000×1400/?nature'
          }));
        }
      });
  }

  submitHandler = (e, type) => {
    e.preventDefault();
    this.setState({ loading: true });
  };

  changeModeHandler = () => {
    this.setState(prevState => updateObject(prevState, { loginMode: !prevState.loginMode }));
  };

  inputChangedHandler = (e, inputId) => {
    const { loginFormConfig } = this.state;

    const updatedConfig = updateObject(loginFormConfig, {
      [inputId]: updateObject(loginFormConfig[inputId], {
        inputConfig: updateObject(loginFormConfig[inputId].inputConfig, {
          value: e.target.value,
          valid: checkValidity(
            e.target.value,
            loginFormConfig[inputId].validation
          ),
          touched: true
        })
      })
    });
    this.setState({ loginFormConfig: updatedConfig });
  };

  render() {
    const {
      backgroundUrl, loading, loginMode, loginFormConfig, signinFormConfig
    } = this.state;

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
      />
    ));

    return (
      <Container bGround={backgroundUrl}>
        <Wrapper>
          <AvatarWrapper>
            <Avatar />
          </AvatarWrapper>
          <Title loginMode={loginMode} />
          <Form onSubmit={e => this.submitHandler(e, (loginMode ? 'login' : 'signin'))}>
            { loginMode ? loginForm : signinForm}
            <Button>
              {loading ? <Spinner /> : <img src={arrowIcon} alt="Continue" />}
            </Button>
          </Form>
          {loginMode ? (
            <Hint onClick={this.changeModeHandler}>
              You dont have
              <span style={{ color: '#85a4e2' }}> account </span>
              yet?
            </Hint>
          ) : (
            <Hint onClick={this.changeModeHandler}>
              I already have
              <span style={{ color: '#85a4e2' }}> account </span>
            </Hint>
          )}
        </Wrapper>
      </Container>
    );
  }
}

export default AuthLayer;

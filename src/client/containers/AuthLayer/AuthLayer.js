import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import userIcon from '../../assets/icons/user.svg';
import arrowIcon from '../../assets/icons/right-arrow.svg';
import Spinner from '../../components/Spinners/dottedSpinner';
import { updateObject } from '../../utils/utility';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  background: ${({ bGround }) => (bGround ? `#3f51b5 url(${bGround})` : '#3f51b5')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
`;

const AvatarWrapper = styled.div`
  position: relative;
  margin-top: 16vh;
  width: 22vh;
  height: 22vh;
  background: rgba(60, 60, 60, 0.6);
  border-radius: 50%;
  padding: 4.5vh;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.div`
  position: relative;
  background: url(${userIcon}) no-repeat center;
  filter: invert(95%);
  height: 100%;
  width: 100%;
  font-weight: 600;
`;

const Title = styled.p`
  font-weight: 100;
  font-size: 32px;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
`;

const Form = styled.form`
  position: relative;
  margin: 0 auto;
  width: 60%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 20px 6px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  text-align: center;
  position: relative;
  display: block;
  font-family: lato, sans-serif;
  font-weight: 600;
  font-size: 12px;
  border: 1px solid gray;
  padding: ${({ centered }) => (centered ? '.3rem .3rem .3rem 2.1rem' : '.3rem')};
  width: 100%;
  height: 2rem;
  color: #3c3e42;
  background: rgba(255, 255, 255, 0.7);

  &::placeholder {
    font-weight: 600;
    font-size: 12px;
    color: #505050;
    opacity: 1;
    transition: transform 0.2s ease-in-out, opacity 0.15s ease-in-out;
  }

  &:focus::placeholder {
    opacity: 0;
    transform: translateX(200px);
  }
`;

const Button = styled.button`
  position: relative;
  width: 2rem;
  height: 2rem;
  background: rgba(60, 60, 60, 0.6);
  border: 1px solid gray;
  border-top: none;
  cursor: pointer;

  & > img {
    filter: invert(100%);
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const PasswordBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class AuthLayer extends Component {
  state = {
    backgroundUrl: null,
    loading: false
    // controls: {
    //   email: {
    //     elementType: 'input',
    //     elementConfig: {
    //       type: 'email',
    //       placeholder: 'Mail Address'
    //     },
    //     value: '',
    //     validation: {
    //       required: true,
    //       isEmail: true
    //     },
    //     valid: false,
    //     touched: false
    //   },
    //   password: {
    //     elementType: 'input',
    //     elementConfig: {
    //       type: 'password',
    //       placeholder: 'Password'
    //     },
    //     value: '',
    //     validation: {
    //       required: true,
    //       minLength: 6
    //     },
    //     valid: false,
    //     touched: false
    //   }
    // },
    // isSignup: true
  };

  componentDidMount() {
    const { disableLoadingPageHandler } = this.props;

    axios
      .get(
        'https://api.unsplash.com/photos/random/?client_id=595801d981b62e6549e983610e2ebb1d42f54b245d427ce465ff6d5fe4439df5&query=nature&orientation=landscape&count=1'
      )
      .then(res => this.setState(
        prevState => updateObject(prevState, { backgroundUrl: res.data[0].urls.regular })
      ))
      .then(() => {
        console.log('HQ background');
        disableLoadingPageHandler();
      })
      .catch(() => {
        console.log('Low quality background due to too much queries :c');
        disableLoadingPageHandler();
        this.setState(prevState => updateObject(prevState, {
          backgroundUrl: 'https://source.unsplash.com/random/2000×1400/?nature'
        }));
      });

    disableLoadingPageHandler();
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.setState(prevState => updateObject(prevState, { loading: true }));
  };

  render() {
    const { backgroundUrl, loading } = this.state;

    return (
      <Container bGround={backgroundUrl}>
        <Wrapper>
          <AvatarWrapper>
            <Avatar />
          </AvatarWrapper>
          <Title>Welcome</Title>
          <Form onSubmit={this.submitHandler}>
            <Input type="email" name="" id="email" placeholder="E-mail" />
            <PasswordBox>
              <Input centered type="password" name="" id="password" placeholder="Password" />
              <Button type="submit">
                {loading ? <Spinner /> : <img src={arrowIcon} alt="Log in" />}
              </Button>
            </PasswordBox>
          </Form>
        </Wrapper>
      </Container>
    );
  }
}

export default AuthLayer;

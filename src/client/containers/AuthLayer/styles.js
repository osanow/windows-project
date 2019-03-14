import styled from 'styled-components';

import userIcon from '../../assets/icons/user.svg';
import arrowIcon from '../../assets/icons/right-arrow.svg';
import cancel from '../../assets/icons/cancel.svg';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  animation: ${({ closed }) => (closed ? 'smoothClose 1.5s ease-in-out 0.5s forwards' : 'none')};
  background: ${({ bGround }) => (bGround ? `#3f51b5 url(${bGround})` : '#3f51b5')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @keyframes smoothClose {
    0% {
      opacity: 1;
      z-index: 9;
    }
    95% {
      opacity: 0;
      z-index: 9;
    }
    100% {
      opacity: 0;
      z-index: -1;
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  margin-top: 16vh;
  width: 22vh;
  height: 22vh;
  background: rgba(60, 60, 60, 0.6);
  border-radius: 50%;
  padding: 4.5vh;
  border: 2px solid rgba(20, 20, 20, 0.15);
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.5);
`;

export const Avatar = styled.div`
  position: relative;
  background: url(${userIcon}) no-repeat center;
  filter: invert(95%);
  height: 100%;
  width: 100%;
  font-weight: 600;
`;

export const Title = styled.p`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 2.5rem;
  font-weight: 100;
  font-size: 32px;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.9);

  &::before {
    position: absolute;
    content: 'Welcome';
    transition: transform 0.4s ease-in-out, opacity 0.25s ease-in-out;
    transform: ${({ loginMode }) => (!loginMode ? 'translateX(40px)' : 'translateX(0)')};
    opacity: ${({ loginMode }) => (!loginMode ? '0' : '1')};
  }

  &::after {
    position: absolute;
    content: 'Sign in';
    transition: transform 0.4s ease-in-out, opacity 0.25s ease-in-out;
    transform: ${({ loginMode }) => (loginMode ? 'translateX(-40px)' : 'translateX(0)')};
    opacity: ${({ loginMode }) => (loginMode ? '0' : '1')};
  }
`;

export const Form = styled.form`
  position: relative;
  margin: 0 auto;
  min-width: 15rem;
  width: 60%;
  max-width: 20rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 20px 6px rgba(0, 0, 0, 0.5);

  &::before {
    content: ' ';
    position: absolute;
    bottom: -18px;
    left: -40px;
    width: 14px;
    height: 14px;
    text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);
    color: #ff1919;
    background: ${({ error }) => (error ? `url(${cancel})` : 'none')};
    animation: ${({ error }) => (error ? 'fadeIn 1s ease-in-out forwards' : 'none')};
  }

  &::after {
    content: ${({ error }) => (error ? `'${error}'` : "''")};
    position: absolute;
    bottom: -18px;
    left: -20px;
    font-size: 13px;
    font-weight: 900;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
    color: #fc0c0c;
    animation: ${({ error }) => (error ? 'fadeIn 1s ease-in-out forwards' : 'none')};
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateX(0px);
    }
    100% {
      opacity: 1;
      transform: translateX(20px);
    }
  }
`;

export const Button = styled.button`
  position: relative;
  width: 2rem;
  height: 2rem;
  background: rgba(60, 60, 60, 0.6);
  border: 1px solid gray;
  border-top: none;
  border-left: none;
  cursor: pointer;

  & > img {
    filter: invert(100%);
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

export const Hint = styled.p`
  position: relative;
  width: 60%;
  min-width: 15rem;
  height: 1.4rem;
  max-width: 20rem;
  text-align: right;
  font-size: 13px;
  color: whitesmoke;
  font-weight: 700;
  margin: 0.1rem auto;
  cursor: pointer;
  text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);

  &::after {
    position: absolute;
    right: -1.5rem;
    width: 1rem;
    height: 1rem;
    background: transparent url(${arrowIcon}) no-repeat right;
    filter: invert(100%);
  }

  &:hover::after {
    content: '';
    animation: slide 1s linear infinite;
  }

  @keyframes slide {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
      transform: translateX(0.3rem);
    }
    70% {
      opacity: 1;
      transform: translateX(0.7rem);
    }
    100% {
      opacity: 0;
      transform: translateX(1rem);
    }
  }
`;

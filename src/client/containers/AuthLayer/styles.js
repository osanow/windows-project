import styled from 'styled-components';

import userIcon from '../../assets/icons/user.svg';
import arrowIcon from '../../assets/icons/right-arrow.svg';

export const Container = styled.div`
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

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
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
  border: 1px solid rgba(0, 0, 0, 0.1);
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
  font-weight: 100;
  font-size: 32px;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
`;

export const Form = styled.form`
  position: relative;
  margin: 0 auto;
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 20px 6px rgba(0, 0, 0, 0.5);
`;

export const Button = styled.button`
  position: relative;
  width: 2rem;
  height: 2rem;
  background: rgba(60, 60, 60, 0.6);
  border: 1px solid gray;
  border-top: none;
  cursor: pointer;
  align-self: right;

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
  height: 1.4rem;
  text-align: right;
  font-size: 13px;
  color: whitesmoke;
  font-weight: 700;
  margin: 0.1rem auto;
  cursor: pointer;
  text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.8);

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

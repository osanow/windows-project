import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { hideApp, maximalizeApp, closeApp } from '../../store/actions/index';
import dash from '../../assets/icons/delete.svg';
import multi from '../../assets/icons/multi-tab.svg';
import close from '../../assets/icons/close.svg';

const WindowWrapper = styled.div`
  position: absolute;
  z-index: 5;
  background-color: whitesmoke;
  border: 1px solid rgb(100, 100, 100);

  top: ${({ top }) => `calc(${top})`};
  left: ${({ left }) => `calc(${left})`};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const NavBelt = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  cursor: move;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;

  & > p {
    font-size: 13px;
  }

  & > img {
    user-select: none;
    margin: 0 0.5rem;
    height: 1rem;
    width: 1rem;
  }
`;

const ContentBox = styled.div`
  position: relative;
  height: calc(100% - 2rem);
  padding: 0;
  margin: 0;
`;

const WindowActions = styled.ul`
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  user-select: none;
`;

const WindowAction = styled.li`
  height: 2rem;
  width: 2.5rem;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  background-color: whitesmoke;

  &:hover {
    filter: brightness(90%);

    &:last-of-type {
      background-color: red;

      & > img {
        filter: invert(100%);
      }
    }
  }

  & > img {
    height: 100%;
    width: 100%;
  }
`;

const systemWindow = (props) => {
  const {
    _id,
    icon,
    top,
    left,
    name,
    children,
    hideAppHandler,
    maximalizeAppHandler,
    closeAppHandler
  } = props;

  return (
    <WindowWrapper top={top} left={left} width="60vw" height="60vh">
      <NavBelt>
        <Description>
          <img src={icon} alt="icon" />
          <p>{name}</p>
        </Description>
        <WindowActions>
          <WindowAction onClick={() => hideAppHandler(_id)}>
            <img src={dash} alt="minimalize" />
          </WindowAction>
          <WindowAction onClick={() => maximalizeAppHandler(_id)}>
            <img src={multi} alt="multi tabs" />
          </WindowAction>
          <WindowAction onClick={() => closeAppHandler(_id)}>
            <img src={close} alt="close" />
          </WindowAction>
        </WindowActions>
      </NavBelt>
      <ContentBox>{children}</ContentBox>
    </WindowWrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  hideAppHandler: id => dispatch(hideApp(id)),
  maximalizeAppHandler: id => dispatch(maximalizeApp(id)),
  closeAppHandler: id => dispatch(closeApp(id))
});

export default connect(
  null,
  mapDispatchToProps
)(React.memo(systemWindow));

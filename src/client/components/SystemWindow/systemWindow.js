import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { hideApp, closeApp, focusApp } from '../../store/actions/index';
import dash from '../../assets/icons/delete.svg';
import multi from '../../assets/icons/multi-tab.svg';
import close from '../../assets/icons/close.svg';
import { updateObject, onCatchHandler } from '../../utils/utility';

const WindowWrapper = styled.div`
  position: absolute;
  z-index: 5;
  background-color: whitesmoke;
  border: 1px solid rgb(100, 100, 100);
  overflow: hidden;

  -webkit-font-smoothing: antialiased; /* for fix blured font */

  transition: ${({ isDragging, positioning }) => {
    if (isDragging) return 'width 0.5s ease-in, height 0.5s ease-in, transform .06s linear';
    if (positioning) return 'width 0.5s ease-in, height 0.5s ease-in';
    return 'width 0.4s ease-in 0.2s, height 0.4s ease-in 0.2s, transform 0.4s ease-in-out';
  }};

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
  user-select: none;
  width: 100%;
  height: 2rem;
  cursor: ${({ isDragging }) => (isDragging ? 'move' : 'default')};
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;

  & > p {
    font-size: 13px;
  }

  & > img {
    margin: 0 0.2rem;
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
  padding: 0.5rem 0.8rem;
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

class systemWindow extends Component {
  constructor(props) {
    super(props);
    const { maximalized, left, top } = this.props;
    this.state = {
      isDragging: false,
      positioning: false,
      maximalized: maximalized || false,
      position: {
        x: left || 0,
        y: top || 0
      },
      dragPosition: {
        x: 0,
        y: 0
      }
    };
  }

  maximalizeAppHandler = () => {
    this.setState(prevState => updateObject(prevState, { maximalized: !prevState.maximalized }));
  };

  render() {
    const {
      _id,
      icon,
      name,
      children,
      closeAppHandler,
      focusAppHandler,
      hideAppHandler,
      closeMode,
      width,
      height,
      draggable
    } = this.props;

    const {
      position,
      dragPosition,
      maximalized,
      isDragging,
      positioning
    } = this.state;

    return (
      <WindowWrapper
        ref={this.window}
        id={`Window${_id}`}
        top={position.y}
        left={position.x}
        width={width || (maximalized ? '100vw' : '45rem')}
        height={height || (maximalized ? 'calc(100vh - 3rem)' : '25rem')}
        isDragging={isDragging}
        positioning={positioning}
        maximalized={maximalized}
        onMouseDown={() => focusAppHandler(_id)}
        style={{
          transform: maximalized
            ? `translate(calc((${position.x}) * (-1)), calc((${
              position.y
            } - .7px) * (-1)))`
            : `translate( ${dragPosition.x}px, ${dragPosition.y}px )`
        }}
      >
        <NavBelt
          isDragging={isDragging}
          onMouseDown={e => (draggable ? onCatchHandler(this, e) : null)}
        >
          <Description>
            <img draggable="false" src={icon} alt="icon" />
            <p style={{ margin: '0 0.5rem' }}> | </p>
            <p>{name}</p>
          </Description>
          <WindowActions onMouseDown={e => e.stopPropagation()}>
            {!closeMode && (
              <>
                <WindowAction onMouseDown={() => hideAppHandler(this)}>
                  <img src={dash} alt="minimalize" />
                </WindowAction>
                <WindowAction onMouseDown={this.maximalizeAppHandler}>
                  <img src={multi} alt="multi tabs" />
                </WindowAction>
              </>
            )}
            <WindowAction onMouseDown={() => closeAppHandler(_id)}>
              <img src={close} alt="close" />
            </WindowAction>
          </WindowActions>
        </NavBelt>
        <ContentBox>{children}</ContentBox>
      </WindowWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  hideAppHandler: app => dispatch(hideApp(app)),
  closeAppHandler: id => dispatch(closeApp(id)),
  focusAppHandler: id => dispatch(focusApp(id))
});

export default connect(
  null,
  mapDispatchToProps
)(systemWindow);

import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import axios from '../../axios-instance';
import { updateObject } from '../../utils/utility';
import { imageContainer } from '../../assets/styles/globalStyles';
import noIcon from '../../assets/icons/noIcon.png';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;

  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'pointer')};
  transition: ${({ isDragging }) => (!isDragging ? 'none' : 'transform .1s linear')};
  transform: ${({ left, top, isDragging }) => (isDragging ? `translate( ${left}px, ${top}px )` : 'translate( 0px, 0px )')};
  grid-column-start: ${({ colPos }) => colPos};
  grid-row-start: ${({ rowPos }) => rowPos};

  pointer-events: all;
  user-select: none;

  &:hover {
    border: 1px solid rgba(107, 128, 160, 0.3);
    background: rgba(89, 151, 249, 0.1);
  }

  &:active {
    border: 1px solid #4286f4;
    background: rgba(89, 151, 249, 0.4);
  }
`;

const ItemIcon = styled(imageContainer)``;

const ItemDesc = styled.p`
  color: white;
  font-size: 13px;
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
  padding: 0;
  margin: 0.3rem 0 0 0;
`;

const calculatePos = (type, value) => {
  if (type === 'row') return Math.abs(Math.ceil(value / (4.8 * 16)));
  return Math.abs(Math.ceil(value / (6.3 * 16)));
};

class Item extends Component {
  state = {
    displayIcon: noIcon,
    isDragging: false,
    gridPosition: {
      rowPos: 'auto',
      colPos: 'auto'
    },
    position: {
      x: 0,
      y: 0
    }
  };

  componentDidMount() {
    const { icon, rowPos, colPos } = this.props;

    import(`../../assets/icons/${icon}`)
      .then(res => this.setState(prevState => updateObject(prevState, {
        displayIcon: res.default,
        gridPosition: { rowPos, colPos }
      })))
      .catch(err => console.log(err));
  }

  onMoveHandler = (e) => {
    const { isDragging } = this.state;
    if (!isDragging) return;
    const newX = e.clientX - this.prevX;
    const newY = e.clientY - this.prevY;
    this.setState(prevState => updateObject(prevState, { position: { x: newX, y: newY } }));
  };

  onDropHandler = (e) => {
    const { _id } = this.props;

    document.body.style.cursor = 'default';
    document.removeEventListener('mouseup', this.onDropHandler, false);
    document.removeEventListener('mousemove', this.throttledMouseMove, false);

    const posX = e.clientX
      - (e.target.offsetLeft > 94 ? 0 : e.target.offsetLeft)
      + (e.target.offsetWidth > 94 ? 0 : e.target.offsetWidth) / 2
      - 22;
    const posY = e.clientY
      - (e.target.offsetTop > 70 ? 0 : e.target.offsetTop)
      + (e.target.offsetHeight > 70 ? 0 : e.target.offsetHeight) / 2
      - 16;

    const maxRow = calculatePos('row', window.innerHeight - 128);
    const currRow = calculatePos('row', posY);

    const maxCol = calculatePos('col', window.innerWidth - 64);
    const currCol = calculatePos('col', posX);

    const newRow = currRow > maxRow ? maxRow.toString() : currRow.toString();
    const newCol = currCol > maxCol ? maxCol.toString() : currCol.toString();

    this.prevX = 0;
    this.prevY = 0;

    this.setState(prevState => updateObject(prevState, {
      isDragging: false,
      position: { x: 0, y: 0 },
      gridPosition: { rowPos: newRow, colPos: newCol }
    }));

    axios(`/items/${_id}`, {
      method: 'PUT',
      data: {
        changedValues: {
          rowPos: newRow,
          colPos: newCol
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  onCatchHandler = (e) => {
    this.prevX = e.clientX;
    this.prevY = e.clientY;

    this.throttledMouseMove = _.throttle(this.onMoveHandler, 100);
    this.setState({ isDragging: true }, () => {
      document.addEventListener('mouseup', this.onDropHandler, false);
      document.addEventListener('mousemove', this.throttledMouseMove, false);
      document.body.style.cursor = 'grabbing';
    });
  };

  render() {
    const {
      name, _id, type, path, permanent
    } = this.props;
    const {
      position, gridPosition, displayIcon, isDragging
    } = this.state;

    return (
      <Container
        data-path={path}
        data-permanent={permanent}
        data-type={type.toString()}
        id={_id}
        isDragging={isDragging}
        left={position.x}
        top={position.y}
        onMouseDown={this.onCatchHandler}
        onDoubleClick={(e) => {
          console.log('double', e.target);
        }}
        rowPos={gridPosition.rowPos}
        colPos={gridPosition.colPos}
      >
        <ItemIcon src={displayIcon} draggable="false" alt="icon" scale="huge" />
        <ItemDesc>{name}</ItemDesc>
      </Container>
    );
  }
}

export default React.memo(Item);

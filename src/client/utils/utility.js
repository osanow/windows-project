/* eslint-disable no-param-reassign */
import _ from 'lodash';
import axios from '../axios-instance';

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const changeFormatWithoutDashes = text => text.replace('_', ' ');
export const changeFormatWithDashes = text => text.replace(' ', '_');

const calculatePos = (type, value) => {
  if (type === 'row') return Math.abs(Math.ceil(value / (4.8 * 16)));
  return Math.abs(Math.ceil(value / (6.3 * 16)));
};

export const onMoveHandler = (icon, e) => {
  icon.draggingTime += 1;
  const newX = e.clientX - icon.prevX;
  const newY = e.clientY - icon.prevY;
  icon.setState(prevState => updateObject(prevState, { position: { x: newX, y: newY } }));
};

export const onDropHandler = (icon, e) => {
  const { _id } = icon.props;

  icon.draggingTime = 0;
  document.removeEventListener('mouseup', icon.onDropFunction, false);
  document.removeEventListener('mousemove', icon.throttledMouseMove, false);

  icon.prevX = 0;
  icon.prevY = 0;

  if (icon.state && icon.state.gridPosition) {
    const posX = e.clientX
      - (e.target.offsetLeft > 94 || e.target.tagName !== 'DIV'
        ? 0
        : e.target.offsetLeft)
      + (e.target.offsetWidth > 94 || e.target.tagName !== 'DIV'
        ? 0
        : e.target.offsetWidth)
        / 2
      - 22;
    const posY = e.clientY
      - (e.target.offsetTop > 70 || e.target.tagName !== 'DIV'
        ? 0
        : e.target.offsetTop)
      + (e.target.offsetHeight > 70 || e.target.tagName !== 'DIV'
        ? 0
        : e.target.offsetHeight)
        / 2
      - 16;

    const maxRow = calculatePos('row', window.innerHeight - 128);
    const currRow = calculatePos('row', posY);

    const maxCol = calculatePos('col', window.innerWidth - 64);
    const currCol = calculatePos('col', posX);

    const newRow = currRow > maxRow ? maxRow.toString() : currRow.toString();
    const newCol = currCol > maxCol ? maxCol.toString() : currCol.toString();


    icon.setState(prevState => updateObject(prevState, {
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
  }
};

export const onCatchHandler = (icon, e) => {
  console.log(icon, e);
  icon.prevX = e.clientX;
  icon.prevY = e.clientY;

  icon.throttledMouseMove = _.throttle(ev => onMoveHandler(icon, ev), 50);
  icon.onDropFunction = ev => onDropHandler(icon, ev);
  icon.setState({ isDragging: true }, () => {
    icon.draggingTime = 0;
    document.addEventListener('mouseup', icon.onDropFunction, false);
    document.addEventListener('mousemove', icon.throttledMouseMove, false);
  });
};

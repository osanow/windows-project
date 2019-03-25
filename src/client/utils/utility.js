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
export const changeFormatWithDashes = text => text.toLowerCase().replace(' ', '_');

const calculatePos = (type, value) => {
  if (type === 'row') return Math.abs(Math.ceil(value / (4.8 * 16)));
  return Math.abs(Math.ceil(value / (6.3 * 16)));
};

export const onMoveHandler = (icon, e) => {
  const { isDragging } = icon.state;
  if (!isDragging) return;

  icon.draggingTime += 1;
  const newX = e.clientX - icon.prevX;
  const newY = e.clientY - icon.prevY;
  icon.setState(prevState => updateObject(prevState, { dragPosition: { x: newX, y: newY } }));
};

export const onDropHandler = (icon) => {
  const { _id } = icon.props;

  icon.prevX = 0;
  icon.prevY = 0;
  icon.draggingTime = 0;
  document.body.style.cursor = 'default';

  document.removeEventListener('mouseup', icon.onDropFunction, false);
  document.removeEventListener('mousemove', icon.throttledMouseMove, false);

  if (icon.state.gridPosition) {
    const rect = icon.dragTarget.getBoundingClientRect();
    const posX = rect.left + icon.dragTarget.offsetWidth / 2;
    const posY = rect.top + icon.dragTarget.offsetHeight / 2;

    const maxRow = calculatePos('row', window.innerHeight - 128);
    const currRow = calculatePos('row', posY);

    const maxCol = calculatePos('col', window.innerWidth - 64);
    const currCol = calculatePos('col', posX);

    const newRow = currRow > maxRow ? maxRow.toString() : currRow.toString();
    const newCol = currCol > maxCol ? maxCol.toString() : currCol.toString();

    icon.setState(prevState => updateObject(prevState, {
      isDragging: false,
      dragPosition: { x: 0, y: 0 },
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
  } else {
    const rect = icon.dragTarget.getBoundingClientRect();
    icon.setState(
      prevState => updateObject(prevState, {
        isDragging: false,
        positioning: true,
        dragPosition: {
          x: 0,
          y: 0
        },
        position: {
          x: `${rect.left}px`,
          y: `${rect.top}px`
        }
      }),
      () => {
        setTimeout(() => {
          icon.setState(prevState => updateObject(prevState, { positioning: false }));
        }, 500);
      }
    );
  }
};

export const onCatchHandler = (icon, e) => {
  if (icon.state.maximalized) return;

  icon.prevX = e.clientX;
  icon.prevY = e.clientY;

  if (e.target.tagName !== 'NAV' && e.target.tagName !== 'DIV') icon.dragTarget = e.target.parentElement;
  else icon.dragTarget = e.target;

  icon.throttledMouseMove = _.throttle(ev => onMoveHandler(icon, ev), 100);
  icon.onDropFunction = () => onDropHandler(icon);
  icon.setState({ isDragging: true }, () => {
    icon.draggingTime = 0;
    document.body.style.cursor = 'grabbing';
    document.addEventListener('mouseup', icon.onDropFunction, false);
    document.addEventListener('mousemove', icon.throttledMouseMove, false);
  });
};

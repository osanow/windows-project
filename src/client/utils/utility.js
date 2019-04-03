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

export const calculateSize = (size) => {
  let scale;
  let newSize;
  if (size > 1024 * 1024) {
    newSize = Math.round(size / (1024 * 1024));
    scale = 'KB';
  } else if (size > 1024) {
    newSize = Math.round(size / 1024);
    scale = 'KB';
  } else {
    newSize = size;
    scale = 'B';
  }
  return `${newSize} ${scale}`;
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

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

  const containers = document.querySelectorAll('[data-type]');
  for (let i = containers.length - 1; i >= 0; i -= 1) {
    const el = containers[i];
    const rect = el.getBoundingClientRect();
    if (icon.dragTarget.id === el.id) continue;
    if (
      e.clientX > rect.left
      && e.clientX < rect.left + el.offsetWidth
      && e.clientY > rect.top
      && e.clientY < rect.top + el.offsetHeight
    ) {
      if (
        icon.dragTarget.getAttribute('data-path')
        === `${el.getAttribute('data-path')}${el.id ? `/${el.id}` : ''}`
      ) {
        icon.dragContainer = null;
        icon.cursorType = 'move';
      } else if (icon.dragContainer && el.id === icon.dragContainer.id) {
        break;
      } else if (
        el.getAttribute('data-type').includes('container')
        && !icon.props.permanent // Not allowed to change path -> set cursor to not allowed
      ) {
        icon.dragContainer = el;
        icon.cursorType = 'move';
      } else {
        icon.dragContainer = el;
        icon.cursorType = 'not allowed';
      }
      break;
    }
  }

  icon.setState(prevState => updateObject(prevState, { dragPosition: { x: newX, y: newY } }));
};

export const onDropHandler = (icon) => {
  const { _id, updateItems } = icon.props;

  icon.prevX = 0;
  icon.prevY = 0;
  icon.draggingTime = 0;
  document.body.style.cursor = 'default';
  document.draggedElem = null;

  document.removeEventListener('mouseup', icon.onDropFunction, false);
  document.removeEventListener('mousemove', icon.throttledMouseMove, false);

  if (icon.cursorType === 'not allowed' && !icon.props.permanent) {
    icon.setState(prevState => updateObject(prevState, {
      isDragging: false,
      dragPosition: { x: 0, y: 0 }
    }));
    return;
  }

  if (icon.state.gridPosition) {
    // for desktop icons
    const rect = icon.dragTarget.getBoundingClientRect();
    const posX = rect.left + icon.dragTarget.offsetWidth / 2;
    const posY = rect.top + icon.dragTarget.offsetHeight / 2;

    const maxRow = calculatePos('row', window.innerHeight - 128);
    const currRow = calculatePos('row', posY);

    const maxCol = calculatePos('col', window.innerWidth - 64);
    const currCol = calculatePos('col', posX);

    const newRow = currRow > maxRow ? maxRow.toString() : currRow.toString();
    const newCol = currCol > maxCol ? maxCol.toString() : currCol.toString();

    const prevCol = icon.state.gridPosition.colPos;
    const prevRow = icon.state.gridPosition.rowPos;

    const newState = {
      isDragging: false,
      dragPosition: { x: 0, y: 0 },
      gridPosition: { rowPos: newRow, colPos: newCol }
    };
    if (icon.props.permanent && icon.dragContainer) delete newState.gridPosition;
    // Not allowed to change path -> Prevent glitch

    icon.setState(prevState => updateObject(prevState, newState));

    if (icon.props.permanent) return;
    // Not allowed to change path -> stop

    const newPath = icon.dragContainer
      ? `${icon.dragContainer.getAttribute('data-path')}${
        icon.dragContainer.id
          ? `/${icon.dragContainer.id.split('/').slice(-1)}`
          : ''
      }`
      : '';

    if (!newPath && newRow === prevRow && newCol === prevCol) return;
    // If nothing changes -> stop

    const changedValues = {
      rowPos: newRow,
      colPos: newCol,
      path: newPath
    };
    if (!icon.dragContainer) {
      delete changedValues.path;
    } else {
      document.getElementById(icon.dragTarget.id).style.display = 'none';
    }

    axios(`/items/${_id}`, {
      method: 'PUT',
      data: { changedValues }
    })
      .then(() => {
        if (
          // if path was changed -> update items in these
          icon.dragContainer
          && `${icon.dragContainer.getAttribute('data-path')}${
            icon.dragContainer.id ? `/${icon.dragContainer.id}` : ''
          }` !== icon.dragTarget.getAttribute('data-path')
        ) {
          updateItems(
            `${icon.dragContainer.getAttribute('data-path')}${
              icon.dragContainer.id ? `/${icon.dragContainer.id}` : ''
            }`
          );
          updateItems(icon.dragTarget.getAttribute('data-path'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // for system window eq. TextEditor / dirExplorer
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
  e.preventDefault();

  icon.prevX = e.clientX;
  icon.prevY = e.clientY;

  if (e.target.tagName !== 'NAV' && e.target.tagName !== 'DIV') icon.dragTarget = e.target.parentElement;
  else icon.dragTarget = e.target;

  icon.dragContainer = null;
  icon.throttledMouseMove = _.throttle(ev => onMoveHandler(icon, ev), 50);
  icon.onDropFunction = () => onDropHandler(icon);
  icon.setState({ isDragging: true }, () => {
    icon.draggingTime = 0;
    document.body.style.cursor = 'grabbing';
    document.addEventListener('mouseup', icon.onDropFunction, false);
    document.addEventListener('mousemove', icon.throttledMouseMove, false);
  });
};

export const fetchIcons = async (items) => {
  const icons = {};
  const newItems = [];
  await asyncForEach(items, async (item) => {
    if (!icons[item.icon]) {
      icons[item.icon] = (await import(`../assets/icons/${item.icon}`)).default;
    }
    newItems.push({
      ...item,
      iconPath: icons[item.icon]
    });
  });
  return newItems;
};

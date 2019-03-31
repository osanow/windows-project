import axios from '../../../axios-instance';

export const changeIconsSize = () => {
  console.log('change icon size');
};

export const personalize = () => {
  console.log('personalize');
};

export const deleteItem = ({ path, id }, updateItems) => {
  const idArray = id.split('/');
  const itemId = idArray[idArray.length - 1];
  axios
    .delete(`/items/${itemId}`)
    .then(() => {
      updateItems(path);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createItem = (type, data, updateItems) => {
  const newItem = {
    name: `New ${type}`,
    type: type === 'directory' ? ['directory', 'container'] : ['file', 'txt'],
    icon: `${type === 'directory' ? 'directory-empty' : 'file'}.svg`,
    path: data.path
  };
  document.body.style.cursor = 'progress';

  axios('/items/', {
    method: 'POST',
    data: {
      items: [newItem]
    }
  })
    .then(() => {
      updateItems(data.path);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const changeName = (id) => {
  const icon = document.getElementById(id);
  icon.querySelector('p').style.display = 'none';
  icon.lastChild.style.display = 'block';
  icon.lastChild.focus();
};

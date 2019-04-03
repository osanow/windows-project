import axios from '../../../axios-instance';

export const emptyTrash = (updateItems) => {
  document.body.style.cursor = 'progress';
  const trashItem = document.querySelector('[data-type*="trash"]');
  axios
    .delete(`/items/${trashItem.id}`)
    .then(() => updateItems(`/Desktop/${trashItem.id}`))
    .then(() => {
      document.body.style.cursor = 'default';
    })
    .catch((error) => {
      console.log(error);
    });
};

export const changeIconsSize = () => {
  console.log('change icon size');
};

export const personalize = () => {
  console.log('personalize');
};

export const deleteItem = ({ path, id }, updateItems) => {
  const idArray = id.split('/');
  const itemId = idArray[idArray.length - 1];
  document.getElementById(id).style.display = 'none';
  if (document.getElementById(`Window${id}`)) document.getElementById(`Window${id}`).style.display = 'none';
  let iterator = 1;
  while (document.getElementById(`${id}/${iterator}`)) {
    document.getElementById(`${id}/${iterator}`).style.display = 'none';
    iterator += 1;
  }
  document.body.style.cursor = 'progress';
  axios
    .delete(`/items/${itemId}`)
    .then(() => updateItems(path))
    .then(() => {
      document.body.style.cursor = 'default';
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createItem = (type, data, updateItems) => {
  const newPath = `${data.path}${
    data.id ? `/${data.id.split('/').slice(-1)}` : ''
  }`;
  const newItem = {
    name: `New ${type}`,
    type: type === 'directory' ? ['directory', 'container'] : ['file', 'txt'],
    icon: `${type === 'directory' ? 'directory-empty' : 'file'}.svg`,
    path: newPath
  };
  document.body.style.cursor = 'progress';

  axios('/items/', {
    method: 'POST',
    data: {
      items: [newItem]
    }
  })
    .then(() => updateItems(newPath))
    .then(() => {
      document.body.style.cursor = 'default';
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

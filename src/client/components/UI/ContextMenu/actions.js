import axios from '../../../axios-instance';

export const changeIconsSize = () => {
  console.log('change icon size');
};

export const personalize = () => {
  console.log('personalize');
};

export const deleteItem = (id) => {
  document.getElementById(id).style.display = 'none';
  let iterator = 1;
  while (document.getElementById(`${id}/${iterator}`)) {
    document.getElementById(`${id}/${iterator}`).style.display = 'none';
    iterator += 1;
  }

  const idArray = id.split('/');
  const itemId = idArray[idArray.length - 1];
  if (document.getElementById(itemId)) document.getElementById(itemId).style.display = 'none';
  axios.delete(`/items/${itemId}`).catch((error) => {
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
      updateItems(data.path, data.id);
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

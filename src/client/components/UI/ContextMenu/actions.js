import axios from '../../../axios-instance';

export const changeIconsSize = () => {
  console.log('change icon size');
};

export const personalize = () => {
  console.log('personalize');
};

export const deleteItem = (id) => {
  document.getElementById(id).style.display = 'none';
  axios.delete(`/items/${id}`).catch((error) => {
    console.log(error);
  });
};

export const createItem = (type, data, updateIcons) => {
  const newItem = {
    name: `New ${type}`,
    type: type === 'directory' ? ['directory', 'container'] : ['file', 'txt'],
    icon: `${type === 'directory' ? 'directory-empty' : 'file'}.svg`,
    path: data.path,
    owner: data.userId
  };
  document.body.style.cursor = 'progress';

  axios('/items/', {
    method: 'POST',
    data: {
      items: [newItem]
    }
  })
    .then(() => {
      updateIcons();
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

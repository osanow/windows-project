import axios from '../axios-instance';

export const changeIconsSize = () => {
  console.log('change icon size');
};

export const personalize = () => {
  console.log('personalize');
};

export const deleteItem = (data) => {
  document.getElementById(data.id).style.display = 'none';

  axios.delete(`/items/${data.id}`).catch((error) => {
    console.log(error);
  });
  console.log('deleted');
};

export const createItem = (type, data) => {
  const newItem = {
    name: `New ${type}`,
    type: [type === 'directory' ? 'container' : 'file'],
    icon: `${type}.png`,
    path: data.path,
    owner: data.userId
  };

  axios('/items/', {
    method: 'POST',
    data: {
      items: [newItem]
    }
  }).catch((error) => {
    console.log(error);
  });
  console.log('created');
};

export const changeName = () => {

};

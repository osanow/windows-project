import axios from '../axios-instance';

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
  })
    .then(() => {
      updateIcons();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const changeName = (ref, id) => {
  ref.current.setState({ nameChanging: true }, () => {
    document.getElementById(id).lastChild.focus();
  });
};
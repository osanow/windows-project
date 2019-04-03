import * as itemsActions from './actions';

export const trash = {
  empty_trash: (_data, updateItems) => itemsActions.emptyTrash(updateItems)
};

export const desktop = {
  new: {
    file: (data, updateItems) => itemsActions.createItem('file', data, updateItems),
    directory: (data, updateItems) => itemsActions.createItem('directory', data, updateItems)
  },
  personalize: itemsActions.personalize,
  view: {
    big_icons: () => itemsActions.changeIconsSize('big'),
    medium_icons: () => itemsActions.changeIconsSize('medium'),
    small_icons: () => itemsActions.changeIconsSize('small')
  }
};

export const file = {
  delete: (data, updateItems) => itemsActions.deleteItem(data, updateItems),
  rename: ({ id }) => itemsActions.changeName(id)
};

export const directory = {
  delete: (data, updateItems) => itemsActions.deleteItem(data, updateItems),
  rename: ({ id }) => itemsActions.changeName(id)
};

export const container = {
  new: {
    file: (data, updateItems) => itemsActions.createItem('file', data, updateItems),
    directory: (data, updateItems) => itemsActions.createItem('directory', data, updateItems)
  }
};

import * as itemsActions from './actions';

export const trash = {
  empty_trash: (_data, updateItems, catchError) => itemsActions.emptyTrash(updateItems, catchError),
  new: null
};

export const desktop = {
  new: {
    file: (data, updateItems, catchError) => itemsActions.createItem('file', data, updateItems, catchError),
    directory: (data, updateItems, catchError) => itemsActions.createItem('directory', data, updateItems, catchError)
  },
  personalize: itemsActions.personalize,
  view: {
    big_icons: () => itemsActions.changeIconsSize('big'),
    medium_icons: () => itemsActions.changeIconsSize('medium'),
    small_icons: () => itemsActions.changeIconsSize('small')
  }
};

export const file = {
  delete: (data, updateItems, catchError) => itemsActions.deleteItem(data, updateItems, catchError),
  rename: ({ id }) => itemsActions.changeName(id)
};

export const directory = {
  delete: (data, updateItems, catchError) => itemsActions.deleteItem(data, updateItems, catchError),
  rename: ({ id }) => itemsActions.changeName(id)
};

export const container = {
  new: {
    file: (data, updateItems, catchError) => itemsActions.createItem('file', data, updateItems, catchError),
    directory: (data, updateItems, catchError) => itemsActions.createItem('directory', data, updateItems, catchError)
  }
};

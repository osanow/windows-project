import * as itemsActions from './actions';

export const desktop = {
  new: {
    file: (data, updateIcons) => itemsActions.createItem('file', data, updateIcons),
    directory: (data, updateIcons) => itemsActions.createItem('directory', data, updateIcons)
  },
  personalize: () => itemsActions.personalize(),
  view: {
    big_icons: () => itemsActions.changeIconsSize('big'),
    medium_icons: () => itemsActions.changeIconsSize('medium'),
    small_icons: () => itemsActions.changeIconsSize('small')
  }
};

export const file = {
  delete: ({ id }) => itemsActions.deleteItem(id),
  rename: ({ id }) => itemsActions.changeName(id)
};

export const directory = {
  delete: ({ id }) => itemsActions.deleteItem(id),
  rename: ({ id }) => itemsActions.changeName(id)
};

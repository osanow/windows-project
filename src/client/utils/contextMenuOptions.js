import * as itemsActions from './itemsActions';

export const desktop = {
  new: {
    file: data => itemsActions.createItem('file', data),
    directory: data => itemsActions.createItem('directory', data)
  },
  personalize: () => itemsActions.personalize(),
  view: {
    big_icons: () => itemsActions.changeIconsSize('big'),
    medium_icons: () => itemsActions.changeIconsSize('medium'),
    small_icons: () => itemsActions.changeIconsSize('small')
  },
};

export const file = {
  delete: id => itemsActions.deleteItem(id),
  change_name: id => itemsActions.changeName(id)
};

export const container = {
  delete: id => itemsActions.deleteItem(id),
  change_name: id => itemsActions.changeName(id)
};

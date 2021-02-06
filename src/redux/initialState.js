import { defaultStyles, defaultTitle } from '../constants';

import { clone } from '../core/utiles';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}

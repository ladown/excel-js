import { defaultStyles, defaultTitle } from '../constants';
import { storage } from '../core/utiles';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;

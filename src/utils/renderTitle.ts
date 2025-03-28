import gradient from 'gradient-string';

import { TITLE_TEXT } from '@/consts.js';

// colors brought in from vscode poimandres theme
const poimandresTheme = {
  c1: '#c3e387',
  c2: '#c3e387',
  c3: '#3ec83e',
};

export const renderTitle = () => {
  const exGradient = gradient(Object.values(poimandresTheme));

  console.log(exGradient.multiline(TITLE_TEXT));
};

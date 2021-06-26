// TODO: creat render that wraps page with provider and store etc.
import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';

import reduxStore from '../../../store/store';

const render = (component: React.ReactNode) => {
  return rtlRender(<Provider store={reduxStore}>{component}</Provider>);
};

export default render;

import React from 'react';
import ReactDOM from 'react-dom';
import Paginations from './Paginations';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Paginations />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import Home from './components/Home';
import './index.scss';

ReactDOM.render(
	<div className="test">
    <Home/>
  </div>,
	document.getElementById('app'),
);

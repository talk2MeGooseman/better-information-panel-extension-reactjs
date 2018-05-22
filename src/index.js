import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Config from './Views/Config';
import {CONFIG_MODE, VIEWER_MODE} from './services/constants'

const params = new URLSearchParams(window.location.search)
let viewComponent;

switch (params.get('mode')) {
  case CONFIG_MODE:
    viewComponent = <Config />;
    break;
  case VIEWER_MODE:
    viewComponent = <div />;
    break;
  default:
    break;
}

ReactDOM.render(viewComponent, document.getElementById('root'));
registerServiceWorker();

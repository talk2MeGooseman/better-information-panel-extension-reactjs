import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Config from './Views/Config';
import {CONFIG_MODE, VIEWER_MODE} from './services/constants'
import TabsStore from './mobx/state/TabsStore';

const params = new URLSearchParams(window.location.search)
let viewComponent;

let tabsStore = new TabsStore();

switch (params.get('mode')) {
  case CONFIG_MODE:
    viewComponent = <Config tabsStore={tabsStore} />;
    break;
  case VIEWER_MODE:
    viewComponent = <div />;
    break;
  default:
    break;
}

ReactDOM.render(viewComponent, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import 'font-awesome/css/font-awesome.min.css';
import registerServiceWorker from './registerServiceWorker';

import Config from './Views/Config';
import AuthWrapper from './components/AuthWrapper'
import {CONFIG_MODE, VIEWER_MODE, DASHBOARD_MODE} from './services/constants'
import TabsStore from './mobx/state/TabsStore';
import BetterInformationPanel from './Views/BetterInformationPanel';
import Dashboard from './Views/Dashboard';
import { configure } from "mobx"

configure({
    enforceActions: "never",
})

// Get the params from the url
const params = new URLSearchParams(window.location.search)
let viewComponent;

// Init the Store
let tabsStore = new TabsStore();

// Anchor: to tell us if its rendered as "panel", "component"
const viewAnchor = params.get('anchor');
// Platform: Tells if the extension is loaded on "web" or "mobile"
const viewPlatform = params.get('platform');

// Check which mode were in to know which component to render
switch (params.get('mode')) {
  case CONFIG_MODE:
    viewComponent = <AuthWrapper tabsStore={tabsStore} ignoreBroadcasts={true} > <Config tabsStore={tabsStore} /> </AuthWrapper>;
    break;
  case VIEWER_MODE:
    viewComponent = <AuthWrapper tabsStore={tabsStore}> <BetterInformationPanel tabsStore={tabsStore} viewAnchor={viewAnchor} viewPlatform={viewPlatform} /> </AuthWrapper>;
    break;
  case DASHBOARD_MODE:
    viewComponent = <AuthWrapper tabsStore={tabsStore} ignoreBroadcasts={true}> <Dashboard tabsStore={tabsStore} /> </AuthWrapper>;
    break;
  default:
    viewComponent = <div>Nothing Loaded</div>;
    break;
}

ReactDOM.render(viewComponent, document.getElementById('root'));
registerServiceWorker();

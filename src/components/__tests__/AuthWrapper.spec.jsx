import React from "react";
import { createShallow, createMount} from '@material-ui/core/test-utils';

import AuthWrapper from "../AuthWrapper";
import TabsStore from "../../mobx/state/TabsStore";

describe('AuthWrapper ', () => {
  let tabsStore, tab, shallow, mount;

  afterEach(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    shallow = createShallow({
      dive: true
    });
    mount = createMount();
    tabsStore = new TabsStore();
    tabsStore.addTab();
    tab = tabsStore.tabs[0];
  });

});
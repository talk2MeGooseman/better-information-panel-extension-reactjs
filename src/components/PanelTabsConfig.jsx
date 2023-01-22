import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
import { MAX_TABS } from '../services/constants';

import TabConfig from './TabConfig';

import { observer } from 'mobx-react';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const styles = theme => ({
  container: {
  },
  addTabButton: {
    display: 'flex',
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const SortableItem = SortableElement(({ tabData, tabsStore, tabNum:index }) => {
  return(
    <Grid item md={3}>
      <TabConfig index={index + 1} tabsStore={tabsStore} tabData={tabData} />
    </Grid>
  );
});


class PanelTabsConfig extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleAddTab = () => {
    let { tabsStore } = this.props
    if(tabsStore.tabCount < MAX_TABS) {
      this.props.tabsStore.addTab();
    }
  };

  renderTabInputs = () => {
    let { tabsStore } = this.props;

    return (
      tabsStore.tabs.map((tabData, index) => <SortableItem tabsStore={tabsStore} tabData={tabData} tabNum={index} key={`item-${index}`} index={index} />)
    );
  }

  render() {
    console.log('renderTabInputs');
    const { classes, tabsStore } = this.props;

    const disableButton = tabsStore.tabCount >= MAX_TABS;

    return (
      <Grid container spacing={8} ref={this.myRef}>
        {this.renderTabInputs()}
        <Grid className={classes.addTabButton} item md={3} alignContent={'center'} alignItems={'center'} justify={'center'}>
          <Tooltip title="Add Tab" placement={"top"}>
            <Fab color="primary" aria-label="add" disabled={disableButton} onClick={this.handleAddTab}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}

PanelTabsConfig.propTypes = {
  classes: PropTypes.object.isRequired,
  tabsStore: PropTypes.object.isRequired,
};

const ObservablePanelTabsConfig = observer(PanelTabsConfig);

const SortableList = SortableContainer((props) => <ObservablePanelTabsConfig {...props} /> );

export default withStyles(styles)(SortableList);

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { MAX_TABS } from '../services/constants';

import TabSectionInfoInputGroup from './TabSectionInfoInputGroup';

import { observer } from 'mobx-react';


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

@observer
class InfoTabForm extends React.Component {

  handleAddTab = () => {
    let { tabsStore } = this.props
    if(tabsStore.tabCount < MAX_TABS) {
      this.props.tabsStore.addTab();
    }
  };

  renderTabInputs() {
    let count = 1;
    let { tabsStore } = this.props

    return tabsStore.tabs.map((tabData) => {
      return (
        <Grid item md={3}>
          <TabSectionInfoInputGroup key={tabData.id} tabsStore={tabsStore} index={count++} tabData={tabData} />
        </Grid>
      );
    });
  }

  render() {
    const { classes, tabsStore } = this.props;

    const disableButton = tabsStore.tabCount >= MAX_TABS;

    return (
        <React.Fragment>
          { this.renderTabInputs() }
          <Grid className={classes.addTabButton} item md={3} alignContent={'center'} alignItems={'center'} justify={'center'}>
            <Tooltip title="Add Tab" placement={"top"}>
              <Button disabled={disableButton} onClick={this.handleAddTab} variant="fab" color="primary" aria-label="add" className={classes.button}>
                <AddIcon />
              </Button>
            </Tooltip>
          </Grid>
        </React.Fragment>
    );
  }
}

InfoTabForm.propTypes = {
  classes: PropTypes.object.isRequired,
  tabsStore: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoTabForm);
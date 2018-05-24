import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TabSectionInfoInputGroup from './TabSectionInfoInputGroup';
import { Divider } from '@material-ui/core';
import { observer } from 'mobx-react';

const MAX_TABS = 3;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
  componentWillMount() {
      this.props.tabsStore.addTab(this.newInfoTabData());
  }

  newInfoTabData() {
    return {
      title: 'Title',
      textColor: '#000000',
      bgColor: '#ffffff',
      body: 'Info Here',
    };
  };

  handleChange = event => {
    if (!event || !event.target) {
      return;
    }
    this.setState({ name: event.target.value });
  };

  handleAddTab = () => {
    let { tabsStore } = this.props
    if(tabsStore.tabCount < MAX_TABS) {
      this.props.tabsStore.addTab(this.newInfoTabData());
    }
  };

  renderTabInputs() {
    let count = 1;
    let { tabsStore } = this.props

    return tabsStore.tabs.map((tabData) => {
      return (
        <React.Fragment>
          <TabSectionInfoInputGroup tabsStore={tabsStore} index={count++} tabData={tabData} />
          <Divider/>
        </React.Fragment>
      );
    });
  }

  render() {
    const { classes, tabsStore } = this.props;

    const disableButton = tabsStore.tabCount >= MAX_TABS;

    return (
      <div className={classes.container}>
        <FormControl>
          { this.renderTabInputs() }
          <Button disabled={disableButton} onClick={this.handleAddTab} variant="fab" color="primary" aria-label="add" className={classes.button}>
            <AddIcon />
          </Button>
        </FormControl>
      </div>
    );
  }
}

InfoTabForm.propTypes = {
  classes: PropTypes.object.isRequired,
  tabsStore: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoTabForm);
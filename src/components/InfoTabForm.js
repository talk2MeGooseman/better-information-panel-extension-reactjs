import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TabSectionInfoInputGroup from './TabSectionInfoInputGroup';
import { Divider } from '@material-ui/core';

const MAX_TABS = 3;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class InfoTabForm extends React.Component {
  state = {
    tabs: []
  };

  componentWillMount() {
    this.setState({
      tabs: [this.newInfoTabData()]
    })
  }

  newInfoTabData() {
    return {
      title: '',
      textColor: '',
      bgColor: '',
      body: '',
    };
  };

  handleChange = event => {
    if (!event || !event.target) {
      return;
    }
    this.setState({ name: event.target.value });
  };

  handleAddTab = () => {
    if(this.state.tabs.length < MAX_TABS) {
      let tabs = [...this.state.tabs, this.newInfoTabData()];

      this.setState({
        tabs: tabs
      });
    }
  };

  renderTabInputs() {
    return this.state.tabs.map((tab) => {
      return (
        <React.Fragment>
          <TabSectionInfoInputGroup />
          <Divider/>
        </React.Fragment>
      );
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          { this.renderTabInputs() }
          <Button onClick={this.handleAddTab} variant="fab" color="primary" aria-label="add" className={classes.button}>
            <AddIcon />
          </Button>
        </FormControl>
      </div>
    );
  }
}

InfoTabForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoTabForm);
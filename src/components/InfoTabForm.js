import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TabSectionInfoInputGroup from './TabSectionInfoInputGroup';

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
    tabs: [{

    }]
  };

  handleChange = event => {
    if (!event || !event.target) {
      return;
    }
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <TabSectionInfoInputGroup />
          <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
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
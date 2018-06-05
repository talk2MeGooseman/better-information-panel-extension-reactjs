import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Add your tabs', 'Enter your text', 'Preview', 'Save'];
}

@observer
class ProgressBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    tabsStore: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.props.tabsStore;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {
            };
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(styles)(ProgressBar);

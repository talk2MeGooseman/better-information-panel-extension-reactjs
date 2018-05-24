import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ColorPicker from './ColorPicker';
import { FormGroup } from '@material-ui/core';

const styles = theme => ({
  inputField: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
});

const TabSectionInfoInputGroup = observer((props) => {
  const handleTitleChange = (event) => {
    props.tabData.title = event.target.value;
  };

  const handleTextColorChange = (color) => {
    props.tabData.textColor = color.hex;
  };

  const handleBgColorChange = (color) => {
    props.tabData.bgColor = color.hex;
  };

  return(
    <React.Fragment>
      <TextField
          id={`title-${props.index}`}
          label={`Tab ${props.index} Title`}
          value={props.tabData.title}
          onChange={handleTitleChange}
          margin="none"
        />
      <FormGroup className={props.classes.inputField}> 
        <Typography variant='caption'>Text Color</Typography>
        <ColorPicker color={props.tabData.textColor} handleChange={handleTextColorChange} />
      </FormGroup> 
      <FormGroup className={props.classes.inputField}> 
        <Typography variant='caption'>Background Color</Typography>
        <ColorPicker color={props.tabData.bgColor} handleChange={handleBgColorChange} />
      </FormGroup> 
    </React.Fragment>
  )
});

TabSectionInfoInputGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number,
  tabData: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabSectionInfoInputGroup);
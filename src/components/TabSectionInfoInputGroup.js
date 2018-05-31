import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { FormGroup } from '@material-ui/core';

import ColorPicker from './ColorPicker';

const styles = theme => ({
  inputField: {
    marginBottom: theme.spacing.unit,
  },
  card: {
    marginBottom: theme.spacing.unit,
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  }
});

const TabSectionInfoInputGroup = observer((props) => {
  const { classes } = props;
  const handleTitleChange = (event) => {
    props.tabData.title = event.target.value;
  };

  const handleTextColorChange = (color) => {
    props.tabData.textColor = color.hex;
  };

  const handleBgColorChange = (color) => {
    props.tabData.bgColor = color.hex;
  };

  const handleDeleteClick = () => {
    props.tabData.destroy();
  };

  let action = null;
  if(props.tabData.canDestroy()) {
    action = (
      <IconButton onClick={handleDeleteClick} className={classes.button} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    );
  }

  return(
    <Card className={classes.card}>
      <CardHeader
        action={action}
        title={`Tab ${props.index}`}
      />
      <CardContent className={classes.cardContent}>
        <FormGroup className={props.classes.inputField}> 
          <TextField
              id={`title-${props.index}`}
              label={`Tab Title`}
              value={props.tabData.title}
              onChange={handleTitleChange}
            />
        </FormGroup> 
        <FormGroup className={props.classes.inputField}> 
          <Typography variant='caption'>Text Color</Typography>
          <ColorPicker color={props.tabData.textColor} handleChange={handleTextColorChange} />
        </FormGroup> 
        <FormGroup className={props.classes.inputField}> 
          <Typography variant='caption'>Background Color</Typography>
          <ColorPicker color={props.tabData.bgColor} handleChange={handleBgColorChange} />
        </FormGroup> 
      </CardContent>
    </Card>
  )
});

TabSectionInfoInputGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number,
  tabData: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabSectionInfoInputGroup);
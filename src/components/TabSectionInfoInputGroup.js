import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import ColorPicker from './ColorPicker';

const TabSectionInfoInputGroup = (props) => (
    <React.Fragment>
      <InputLabel htmlFor="name-simple">Tab {props.number} Title</InputLabel>
      <Input id="name-simple" value={props.name} onChange={props.handleChange} />
      <Typography variant='caption'>Text Color</Typography><ColorPicker color={props.textColor} />
      <Typography variant='caption'>Background Color</Typography><ColorPicker color={props.bgColor} />
    </React.Fragment>
);

export default TabSectionInfoInputGroup;
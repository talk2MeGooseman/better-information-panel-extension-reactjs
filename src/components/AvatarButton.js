import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  avatar: {
    width: 30,
    height: 30,
  },
});

const AvatarButton = (props) => {
  const { classes, isVisible, videoToggleImageUrl, handleToggleShow, fab } = props;
  let icon, tooltipText, fabClass;

  if (isVisible)
  {
    tooltipText = "Hide";
    icon = <VisibilityIcon />;
  } else {
    tooltipText = "Show";
    icon = <VisibilityOffIcon />;
  }

  if (videoToggleImageUrl && videoToggleImageUrl.length > 0) {
    icon = <Avatar src={videoToggleImageUrl} className={classes.avatar} />
  }

  if (fab) {
    fabClass = classes.fab;
  }

  return (
    <Tooltip id="tooltip-top" title={tooltipText} placement="top">
      <Button mini onClick={handleToggleShow} variant="fab" className={fabClass} color="primary">
        {icon}
      </Button>
    </Tooltip>
  );
}

AvatarButton.propTypes = {
  classes: PropTypes.object,
  isVisible: PropTypes.bool,
  videoToggleImageUrl: PropTypes.string,
  handleToggleShow: PropTypes.func,
};

export default withStyles(styles)(AvatarButton);
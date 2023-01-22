import PropTypes from 'prop-types';
import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  BottomRight: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  BottomLeft: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 3,
  },
  TopRight: {
    position: 'absolute',
    top: theme.spacing.unit * 6,
    right: theme.spacing.unit * 3,
  },
  TopLeft: {
    position: 'absolute',
    top: theme.spacing.unit * 6,
    left: theme.spacing.unit * 3,
  },
  avatar: {
    width: 30,
    height: 30,
  },
});

const AvatarButton = (props) => {
  const { classes, isVisible, configView, videoToggleImageUrl, handleToggleShow, fab } = props;
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

  if (!configView) {
    if (fab) {
      fabClass = classes[fab];
    } else {
      fabClass = classes['BottomRight'];
    }
  }


  return (
    <Tooltip id="tooltip-top" title={tooltipText} placement="top">
      <Fab mini onClick={handleToggleShow} className={fabClass} color="primary">
        {icon}
      </Fab>
    </Tooltip>
  );
}

AvatarButton.propTypes = {
  classes: PropTypes.object,
  isVisible: PropTypes.bool,
  configView: PropTypes.bool,
  videoToggleImageUrl: PropTypes.string,
  handleToggleShow: PropTypes.func,
  fab: PropTypes.string,
};

export default withStyles(styles)(AvatarButton);

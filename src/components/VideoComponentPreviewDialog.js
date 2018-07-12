import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import BetterInformationPanel from '../Views/BetterInformationPanel';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import { COMPONENT_ANCHOR, WEB_PLATFORM } from '../services/constants';

const styles = theme => ({
  dialogContent: {
    backgroundColor: "black",
    position: 'relative',
    width: '350px',
    height: '309px',
  },
  panelContainer: {
    width: '85%',
    position: 'relative',
  }
});

@observer
class VideoComponentPreviewDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    tabsStore: PropTypes.object,
  };

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen, classes } = this.props;

    return (
      <React.Fragment>
        <Button variant="raised" color="primary" onClick={this.handleClickOpen}>Preview Video Overlay</Button>
        <Dialog
          fullScreen={fullScreen}
          scroll={"body"}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Video Component Overlay Preview"}</DialogTitle>
          <DialogContent className={classes.dialogContent}>
              <div className={classes.panelContainer}>
                <BetterInformationPanel viewAnchor={COMPONENT_ANCHOR} viewPlatform={WEB_PLATFORM} tabsStore={this.props.tabsStore} />
              </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

VideoComponentPreviewDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(VideoComponentPreviewDialog);
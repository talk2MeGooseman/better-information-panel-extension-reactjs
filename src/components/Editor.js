import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import 'react-mde/lib/styles/css/react-mde-all.css';
import '../Config.css';
import ReactMde from "react-mde";
import {EditorState, ContentState} from "draft-js";

@observer
export default class Editor extends React.Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    tabsStore: PropTypes.object.isRequired,
  };

  state = {
    mdeState: null,
  };

  createMdeState(tabData) {
    let editorState = {
      html: "",
      markdown: tabData.body,
      draftEditorState: EditorState.createWithContent(ContentState.createFromText(tabData.body))
    };
    console.log(editorState)
    return editorState;
  }

  componentDidMount() {
    let mdeState = this.createMdeState(this.props.tab);

    this.handleValueChange(mdeState);
  }

  handleValueChange = (newMdeState) => {
    this.setState({
      mdeState: newMdeState,
    });

    this.props.tabsStore.saveState = '';
    this.props.tab.body = newMdeState.markdown;
  }

  render() {
    return(
      <ReactMde
        style={{ maxHeight: '450px'}}
        onChange={this.handleValueChange}
        editorState={this.state.mdeState}
      />
    );
  }
}

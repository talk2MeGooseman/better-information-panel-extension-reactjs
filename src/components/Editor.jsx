import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Showdown from "showdown";
import { SHOWDOWN_CONFIG } from "../services/constants";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const TOOLBAR_FEATURES = [
  "heading-1",
  "heading-2",
  "heading-3",
  "bold",
  "italic",
  "strikethrough",
  "code",
  "quote",
  "unordered-list",
  "ordered-list",
  "table",
  "horizontal-rule",
  "guide",
  "preview"
];

export default class Editor extends React.Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    tabsStore: PropTypes.object.isRequired,
    allowPreview: PropTypes.bool,
  };

  componentDidMount() {
    this.handleChange(this.props.tab.body);
    this.converter = new Showdown.Converter(SHOWDOWN_CONFIG);
  }

  handleChange = value => {
    if(this.props.tab.body !== value) {
      this.props.tabsStore.saveState = "";
    }
    this.props.tab.body = value;
  };

  render() {
    const { tab } = this.props;

    let toolbar = [...TOOLBAR_FEATURES];

    let Wrapper = styled.div`
      .editor-preview {
        background: ${tab.bgColor};
        color: ${tab.textColor};
      }
    `;

    if (this.props.allowPreview) {
      toolbar.push('preview');
    }

    return (
      <Wrapper>
        <SimpleMDE
          onChange={this.handleChange}
          value={this.props.tab.body}
          options={{
            autoDownloadFontAwesome: false,
            spellChecker: false,
            status: false,
            insertTexts: {
              toggleUnorderedList: ["* ", ""],
            },
            toolbar: toolbar,
            previewRender: (plainText) => {
              return this.converter.makeHtml(plainText); // Returns HTML from a custom parser
            },
          }}
        />
      </Wrapper>
    );
  }
}

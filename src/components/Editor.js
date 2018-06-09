import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import styled from "styled-components";
import * as Showdown from "showdown";
import { SHOWDOWN_CONFIG } from "../services/constants";

import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";

let TOOLBAR_FEATURES = [
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
  "link",
  "image",
  "table",
  "horizontal-rule",
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

  _toggleLine(cm, name) {
    var startPoint = cm.getCursor("start");
    var endPoint = cm.getCursor("end");

    var map = {
      "check-list": "- [ ] ",
    };

    for (var i = startPoint.line; i <= endPoint.line; i++) {
      (function(i) {
        var text = cm.getLine(i);

        text = map[name] + text;

        cm.replaceRange(
          text,
          {
            line: i,
            ch: 0,
          },
          {
            line: i,
            ch: 99999999999999,
          }
        );
      })(i);
    }
    cm.focus();
  }

  customCheckListFeature() {
    return {
      name: "check-list",
      className: "fa fa-check",
      title: "Check List",
      action: editor => {
        var cm = editor.codemirror;
        this._toggleLine(cm, "check-list");
      }
    };
  }

  render() {
    const { tab } = this.props;

    let toolbar = [...TOOLBAR_FEATURES, this.customCheckListFeature()];

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
            spellChecker: true,
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

import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";


import SimpleMDE from "react-simplemde-editor";
import "../Config.css";
import "simplemde/dist/simplemde.min.css";

@observer
export default class Editor extends React.Component {
  static propTypes = {
    tab: PropTypes.object.isRequired,
    tabsStore: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.handleChange(this.props.tab.body);
  }

  handleChange = value => {
    this.props.tab.body = value;
  };

  _toggleLine(cm, name) {
    var startPoint = cm.getCursor("start");
    var endPoint = cm.getCursor("end");

    var map = {
      "check-list": "- [] ",
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

  render() {
    return (
      <SimpleMDE
        onChange={this.handleChange}
        value={this.props.tab.body}
        options={{
          spellChecker: true,
          status: false,
          hideIcons: ["preview", "side-by-side", "fullscreen"],
          insertTexts: {
            toggleUnorderedList: ["* ", ""],
          },
          toolbar: [
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
            {
              name: "check-list",
              action: (editor) => {
                var cm = editor.codemirror;
                this._toggleLine(cm, "check-list");
              },
              className: "fa fa-check",
              title: "Check List",
            },
          ],
        }}
      />
    );
  }
}

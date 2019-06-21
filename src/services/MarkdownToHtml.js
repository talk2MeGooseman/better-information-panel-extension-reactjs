import React from 'react';
import stripHtml from 'strip';
import * as Showdown from "showdown";
import ReactHtmlParser from 'react-html-parser';
import {
  SHOWDOWN_CONFIG,
  STRIP_TAGS,
} from "../services/constants";

export default function (md) {
  let stripedMd = stripHtml(md);
  let html = markdownToHtml(stripedMd);
  return sanitizeHtml(html);
}

function markdownToHtml(md) {
  let converter = new Showdown.Converter(SHOWDOWN_CONFIG);
  return converter.makeHtml(md);
}

function sanitizeHtml(html) {
  return ReactHtmlParser(html, {
    transform: (node) => {
      let found = STRIP_TAGS.find((tag) => {
        return node.name === tag;
      });

      if (found) {
        return null;
      }

    }
  })
}

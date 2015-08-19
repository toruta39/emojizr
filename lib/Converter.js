import twemoji from 'twemoji';
import React from 'react';
import Dict from './Dict';

export function kanaToEmojizedText(text) {
  function getPrefixChar(char, i, arr) {
    return arr[i-1] !== char ? arr[i-1] : getPrefixChar(char, i-1, arr);
  }

  function sanitize(text) {
    let el = document.createElement('div');

    el.innerText = text;
    return el.innerHTML;
  }

  const escapedPlaceholder = '\u0000';
  let escapedItems = [];

  function escapeText(text) {
    let match = /\`([^\`)]*)\`/.exec(text);

    if (match) {
      escapedItems.push(match[1]);
      return escapeText(text.replace(match[0], escapedPlaceholder));
    } else {
      return text;
    }
  }

  function unescapeText(text) {
    if (typeof text === 'string') {
      text = text.split(escapedPlaceholder);
    }

    if (text.length > 1) {
      text.push(...text.splice(text.length - 2, 2).join(escapedItems.pop()).split(escapedPlaceholder));
    }

    if (text.length > 1) {
      return unescapeText(text);
    } else {
      return text[0];
    }
  }

  return unescapeText(escapeText(sanitize(text)).split('')
    .map(char => Dict.get(char) || char)
    .map((char, i, arr) => char === 'ー' ? getPrefixChar(char, i, arr) : char)
    .join(''));
}

export function kanaToEmojizedHtml(text, options) {
  return twemoji.parse(kanaToEmojizedText(text), options || {});
}

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

  return sanitize(text).split('')
    .map(char => Dict.get(char) || char)
    .map((char, i, arr) => char === 'ー' ? getPrefixChar(char, i, arr) : char)
    .join('');
}

export function kanaToEmojizedHtml(text, options) {
  return twemoji.parse(kanaToEmojizedText(text), options || {});
}

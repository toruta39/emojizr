import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ZeroClipboard from 'zeroclipboard';
import classNames from 'classnames';

export default class CopyButton extends Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.state = { copied: false };
  }

  componentDidMount() {
    this.clipboard = new ZeroClipboard(findDOMNode(this));
    this.clipboard.on('copy', () => {
      this.setState({ copied: true });

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }

  render() {
    return (
      <a className="copy-button" href="#" data-clipboard-text={this.props.text}>
        <div className={classNames({
          "copy-button__tip": true,
          "copy-button__tip--active": this.state.copied
          })}>コピーしました</div>
        <svg className="copy-icon" height="17" width="17" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(0.035,0.035) translate(0,-60)">
            <path d="M314.099,250H186.901c-12.536,0-22.713,10.175-22.713,22.715  c0,12.537,10.177,22.712,22.713,22.712h127.198c12.537,0,22.716-10.175,22.716-22.712C336.814,260.175,326.636,250,314.099,250z   M314.099,331.771H186.901c-12.536,0-22.713,10.175-22.713,22.711s10.177,22.716,22.713,22.716h127.198  c12.537,0,22.716-10.18,22.716-22.716S326.636,331.771,314.099,331.771z M73.333,431.711c0,20.078,16.264,36.34,36.343,36.34  h281.648c20.078,0,36.345-16.262,36.345-36.34V122.802c0-20.077-16.267-36.341-36.345-36.341h-74.049  c-6.263-31.071-33.797-54.512-66.774-54.512c-32.98,0-60.512,23.441-66.774,54.512h-74.051c-20.079,0-36.343,16.264-36.343,36.341  V431.711z M138.75,131.889h43.607v16.353c0,11.081,8.909,19.989,19.991,19.989h96.301c11.08,0,19.991-8.909,19.991-19.989v-16.353  h43.607c11.081,0,19.992,8.909,19.992,19.991v250.754c0,11.084-8.911,19.99-19.992,19.99H138.75  c-11.083,0-19.989-8.906-19.989-19.99V151.879C118.761,140.797,127.667,131.889,138.75,131.889z M227.787,100.089  c0-12.537,10.177-22.714,22.713-22.714c12.537,0,22.715,10.177,22.715,22.714c0,12.538-10.178,22.713-22.715,22.713  C237.964,122.802,227.787,112.627,227.787,100.089z" fill="#fff"/>
          </g>
        </svg>
        <span>コピー</span>
      </a>
    );
  }
}

CopyButton.propTypes = {text: PropTypes.string};
CopyButton.defaultProps = {text: ''};

ZeroClipboard.config( { swfPath: "/node_modules/zeroclipboard/dist/ZeroClipboard.swf" } );

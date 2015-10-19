import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {kanaToEmojizedText, kanaToEmojizedHtml} from './lib/Converter';

import CopyButton from './component/CopyButton';
import TweetButton from './component/TweetButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      textResult: kanaToEmojizedText(this.props.defaultText),
      htmlResult: kanaToEmojizedHtml(this.props.defaultText, {size: 16})
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(evt) {
    this.setState({
      text: evt.target.value,
      textResult: kanaToEmojizedText(evt.target.value),
      htmlResult: kanaToEmojizedHtml(evt.target.value, {size: 16})
    });
  }

  render() {
    function wrapEmojizedHtml(html) {
      return <p className="emojized" dangerouslySetInnerHTML={{
                __html: html}} />;
    }

    return (
      <div>
        <section>
          <h2>本文：</h2>
          <textarea placeholder={`${this.props.defaultText}`} className="textarea" value={this.state.text} onChange={this.onInputChange}></textarea>
        </section>

        <section>
          <h2>プレビュー：</h2>
          <div className="preview">
            {wrapEmojizedHtml(this.state.htmlResult)} #Emojizr
          </div>
        </section>

        <section className="submit">
          { !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) &&
            <CopyButton text={this.state.textResult} /> }
          <TweetButton text={this.state.textResult} />
        </section>
      </div>
    );
  }
}

App.propTypes = {
  defaultText: PropTypes.string.isRequired
};

ReactDOM.render(<App defaultText={"にゃんぱすー \"にゃんぱすー\""} />, document.querySelector('#app'));

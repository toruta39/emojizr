import React from 'react';
import ReactDOM from 'react-dom';
import {kanaToEmojizedText, kanaToEmojizedHtml} from './lib/Converter';

import TweetButton from './component/TweetButton';

class App extends React.Component {
  constructor(props) {
    super(props);

    let defaultText = 'にゃんぱすー `にゃんぱすー`'

    this.state = {
      text: defaultText,
      textResult: kanaToEmojizedText(defaultText),
      htmlResult: kanaToEmojizedHtml(defaultText, {size: 16})
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
      return <p className="emoji" dangerouslySetInnerHTML={{
                __html: html}} />;
    }

    return (
      <div>
        <section>
          <h2>本文：</h2>
          <textarea className="textarea" value={this.state.text} onChange={this.onInputChange}></textarea>
        </section>

        <section>
          <h2>プレビュー：</h2>
          <div className="preview">
            {wrapEmojizedHtml(this.state.htmlResult)} #Emojizr
          </div>
        </section>

        <section className="submit">
          <TweetButton text={this.state.textResult} />
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));

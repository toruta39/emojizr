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
        <textarea className="textarea" value={this.state.text} onChange={this.onInputChange}></textarea>
        <div className="preview">
          {wrapEmojizedHtml(this.state.htmlResult)} #Emojizr
        </div>
        <div className="submit">
          <TweetButton text={this.state.textResult} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));

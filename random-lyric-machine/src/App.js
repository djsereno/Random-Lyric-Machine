import React from "react";
import "./App.css";

const lyricData = require("./random-lyrics.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyric: null,
      artist: null,
    };
  }

  updateLyric() {
    const randomLyric = getRandomLyric();
    this.setState({
      lyric: randomLyric.lyric,
      artist: randomLyric.artist,
    });
  }

  render() {
    if (!this.state.lyric) {
      this.updateLyric();
    }

    return (
      <div id="quote-box">
        <p id="text">
          <i class="fa-solid fa-quote-left"></i>
          {this.state.lyric}
          <i class="fa-solid fa-quote-right"></i>
        </p>
        <p id="author">- {this.state.artist}</p>

        <div className="buttons">
          <a
            id="tweet-quote"
            className="button"
            href="twitter.com/intent/tweet"
            target={"_blank"}
          >
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a
            id="github-link"
            className="button"
            href="https://github.com/djsereno"
            target={"_blank"}
          >
            <i class="fa-brands fa-github"></i>
          </a>
          <button
            id="new-quote"
            className="button"
            onClick={() => this.updateLyric()}
          >
            New Lyric
            <i class="fa-solid fa-music"></i>
          </button>
        </div>
      </div>
    );
  }
}

function getRandomLyric() {
  return lyricData[Math.floor(Math.random() * lyricData.length)];
}

export default App;

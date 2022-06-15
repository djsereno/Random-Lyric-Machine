import React from "react";
import "./App.css";

const lyricData = require("./random-lyrics.json");
const colors = [
  "#9e0142",
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#abdda4",
  "#66c2a5",
  "#3288bd",
  "#5e4fa2",
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyric: null,
      artist: null,
      color: "white",
      fadeOutActive: false,
      fadeInActive: false,
    };
  }

  updateColor() {
    let cssRoot = document.querySelector(":root");
    let newColors = colors.filter((color) => color != this.state.color);
    let newColor = newColors[Math.floor(Math.random() * newColors.length)];
    cssRoot.style.setProperty("--color-bg", newColor);
    cssRoot.style.setProperty("--color-font", newColor);
    this.setState({
      color: newColor,
    });
  }

  fadeOut() {
    this.setState({
      fadeOutActive: true,
    });
    let cssRoot = document.querySelector(":root");
    let cardColor = getComputedStyle(cssRoot).getPropertyValue("--color-card");
    cssRoot.style.setProperty("--color-font", cardColor);
  }

  updateLyric() {
    let newLyrics = lyricData.filter(
      (lyric) => lyric.lyric != this.state.lyric
    );
    let randomLyric = newLyrics[Math.floor(Math.random() * newLyrics.length)];

    this.setState({
      lyric: randomLyric.lyric,
      artist: randomLyric.artist,
    });

    this.updateColor();
  }

  handleClick() {
    // Ignore input while fading animating
    if (!this.state.fadeInActive && !this.state.fadeOutActive) {
      this.fadeOut();
    }
  }

  handleTransitionEnd = (event) => {
    if (this.state.fadeOutActive) {
      this.setState({
        fadeOutActive: false,
        fadeInActive: true,
      });
      this.updateLyric();
    } else if (this.state.fadeInActive) {
      this.setState({
        fadeInActive: false,
      });
    }
  };

  render() {
    if (!this.state.lyric) {
      this.updateLyric();
    }

    return (
      <div
        id="background-wrapper"
        className="fade-color fade-in-bg"
        onTransitionEnd={this.handleTransitionEnd}
      >
        <div id="quote-box">
          <div id="lyric-and-artist" className="fade-color fade-in-text">
            <p id="text">
              <i className="fa-solid fa-quote-left"></i>
              {this.state.lyric}
              <i className="fa-solid fa-quote-right"></i>
            </p>

            <p id="author">- {this.state.artist}</p>
          </div>

          <div className="buttons">
            <a
              id="tweet-quote"
              className="button fade-color fade-in-bg"
              href="twitter.com/intent/tweet"
              target={"_blank"}
            >
              <i className="fa-brands fa-twitter"></i>
            </a>

            <a
              id="github-link"
              className="button fade-color fade-in-bg"
              href="https://github.com/djsereno"
              target={"_blank"}
            >
              <i className="fa-brands fa-github"></i>
            </a>

            <button
              id="new-quote"
              className="button fade-color fade-in-bg"
              onClick={() => {
                this.handleClick();
              }}
            >
              <i className="fa-solid fa-music"></i>
              New Lyric
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

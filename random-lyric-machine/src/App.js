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
    let color = setNewColor("", colors);
    let randomLyric = setNewLyric("", lyricData);
    this.state = {
      lyric: randomLyric.lyric,
      artist: randomLyric.artist,
      color: color,
      fadeOutActive: false,
      fadeInActive: true,
    };
  }

  updateColor = () => {
    let newColor = setNewColor(this.state.color, colors);
    this.setState({
      color: newColor,
    });
  };

  updateLyric = () => {
    let randomLyric = setNewLyric(this.state.lyric, lyricData);
    this.setState({
      lyric: randomLyric.lyric,
      artist: randomLyric.artist,
    });

    this.updateColor();
  };

  fadeOut = () => {
    this.setState({
      fadeOutActive: true,
    });
    let cssRoot = document.querySelector(":root");
    let cardColor = getComputedStyle(cssRoot).getPropertyValue("--color-card");
    cssRoot.style.setProperty("--color-font", cardColor);
  };

  handleClick = () => {
    // Ignore input while animating
    if (!this.state.fadeInActive && !this.state.fadeOutActive) {
      this.fadeOut();
    }
  };

  handleTransitionEnd = (event) => {
    // Fade in and fade out handled with CSS transitions
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

  handleAnimationEnd = (event) => {
    // Fade in during beginning handled with CSS animation
    if (this.state.fadeInActive) {
      this.setState({
        fadeInActive: false,
      });
    }
  };

  render() {

    return (
      <div
        id="background-wrapper"
        className="fade-color fade-in-bg"
        onTransitionEnd={this.handleTransitionEnd}
        onAnimationEnd={this.handleAnimationEnd}
      >
        <div id="quote-box" className="container">
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
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>

            <a
              id="github-link"
              className="button fade-color fade-in-bg"
              href="https://github.com/djsereno"
              target="_blank"
              rel="noreferrer"
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

const setNewColor = (currentColor, colors) => {
  let newColors = colors.filter((color) => color !== currentColor);
  let newColor = newColors[Math.floor(Math.random() * newColors.length)];
  let cssRoot = document.querySelector(":root");
  cssRoot.style.setProperty("--color-bg", newColor);
  cssRoot.style.setProperty("--color-font", newColor);
  return newColor;
};

const setNewLyric = (currentLyric, lyrics) => {
  let newLyrics = lyrics.filter((lyric) => lyric.lyric !== currentLyric);
  return newLyrics[Math.floor(Math.random() * newLyrics.length)];
};

export default App;

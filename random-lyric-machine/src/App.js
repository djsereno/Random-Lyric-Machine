import React from 'react';
import './App.css';

const lyricData = require('./random-lyrics.json');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyric: null,
      artist: null
    }
  }

  updateLyric() {
    const randomLyric = getRandomLyric();
    this.setState({
      lyric: randomLyric.lyric,
      artist: randomLyric.artist
    });
  }
  
  render() {
    if (!this.state.lyric) {
      this.updateLyric();
    }
    
    return (
      <div id='quote-box'>
        <p id='text'>"{this.state.lyric}"</p>
        <p id='author'>- {this.state.artist}</p>
        <button
          id='new-quote'
          onClick={() => this.updateLyric()}
        >New Lyric</button>
        <a
          id='tweet-quote'
          href='twitter.com/intent/tweet'
        >Tweet It</a>
      </div>
    );
  }
}

function getRandomLyric() {
  return lyricData[Math.floor(Math.random()*lyricData.length)];
}

export default App;

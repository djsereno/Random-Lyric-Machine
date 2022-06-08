import './App.css';

const lyricData = require('./random-lyrics.json');

function App() {
  const lyric = RandomLyric();
  return (
    <div id='quote-box'>
      <p id='text'>"{lyric.lyric}"</p>
      <p id='author'>- {lyric.artist}</p>
      <button id='new-quote'>New Lyric</button>
      <a id='tweet-quote' href=''>Tweet It</a>
    </div>
  );
}

function RandomLyric() {
  return lyricData[Math.floor(Math.random()*lyricData.length)];
}

export default App;

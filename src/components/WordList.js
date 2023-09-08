import React from 'react';

function WordList(props) {
  const { foundWords } = props;

  return (
    <div className= "wordContainer">
      <h1 className = "foundWordsHeading">FOUND WORDS</h1>
            <ul>
              {Array.from(foundWords).map((word, index) => (
                <li className = "word" key={index}>{word}</li>
              ))}
            </ul>
    </div>
  );
}

export default WordList;
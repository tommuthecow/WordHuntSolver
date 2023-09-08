const Trie = require('./trie');
const dictionary = require('../filteredDictionary');


function buildTrie(words) {
    const trie = new Trie();
    for (let word of words) {
      word = word.trim();
      if (word.length >= 3) {
        trie.insert(word.toUpperCase());
      }
    }
    return trie;
  }

const trie = buildTrie(dictionary)
trie.printTrie()
module.exports = trie;
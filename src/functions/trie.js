class TrieNode {
  constructor() {
    this.children = {};
    this.wordEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    for (let char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.wordEnd = true;
  }

  printTrie() {
    this._printTrieRecursive(this.root, "");
  }

  _printTrieRecursive(node, prefix) {
    if (node.wordEnd) {
      console.log(prefix);
    }
    for (let char in node.children) {
      this._printTrieRecursive(node.children[char], prefix + char);
    }
  }
}

module.exports = Trie;
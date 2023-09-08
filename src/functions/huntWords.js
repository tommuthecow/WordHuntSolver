function huntWords(grid, trie) {
    console.log('Inside huntWords');
    const foundWords = new Set(); // Store the found words
    
    // Initialize the visited array with false values
    const visited = Array(grid.length)
      .fill(false)
      .map(() => Array(grid[0].length).fill(false));

  // Word search algorithm
  // Iterate through each cell on the board
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      searchWords('', row, col, visited, trie.root);
    }
  }

  // Function to perform the word search
  function searchWords(word, row, col, visited, node) {
    // Base case: If the current cell is out of bounds or already visited, return
    if (
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[row].length ||
      visited[row][col] ||
      !node.children[grid[row][col]]
    ) {
      return;
    }

    visited[row][col] = true; // Mark the current cell as visited
    word += grid[row][col]; // Add the current letter to the word
    node = node.children[grid[row][col]]; // Traverse the trie to the next node

    // Check if the word exists in the trie
    if (node.wordEnd) {
      foundWords.add(word); // Store the found word
    }

    // Recursive calls to explore neighboring cells
    searchWords(word, row - 1, col, visited, node); // Up
    searchWords(word, row + 1, col, visited, node); // Down
    searchWords(word, row, col - 1, visited, node); // Left
    searchWords(word, row, col + 1, visited, node); // Right
    searchWords(word, row - 1, col - 1, visited, node); // Diagonal: Up-Left
    searchWords(word, row - 1, col + 1, visited, node); // Diagonal: Up-Right
    searchWords(word, row + 1, col - 1, visited, node); // Diagonal: Down-Left
    searchWords(word, row + 1, col + 1, visited, node); // Diagonal: Down-Right

    visited[row][col] = false; // Mark the current cell as unvisited for backtracking
  }

  return foundWords;
}

module.exports = huntWords;
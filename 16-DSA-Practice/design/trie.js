// LC 208 — Implement Trie (Prefix Tree) | Medium
//
// STATUS: reference implementation, NOT a logged timed-attempt.
// Migrated from 01-JavaScript/02-advanced-senior-level.md during /prep-restructure
// (2026-08-19). Note: 08-DSA/07-trees.md ALSO has a correct Trie (insert/
// search/startsWith/autocomplete) as its own bonus content — that remains the
// canonical NOTES/theory home. This file is kept separately because it has
// one thing that version doesn't: a working delete(). Do your own timed
// attempt first, then compare against whichever of the two has what you need.
//
// Attempt: (not yet logged) | Hints: n/a | Result: n/a
// Edge cases to test yourself against: search() on a prefix that was never
// inserted as a complete word (must return false, unlike startsWith), delete()
// on a word that's a prefix of another inserted word (must not remove the
// shared nodes), delete() on a non-existent word.
// Redo: n/a until you've done a fresh timed attempt.

class TrieNode {
  constructor() {
    this.children = {}; // char → TrieNode
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    const node = this._findNode(word);
    return node !== null && node.isEndOfWord;
  }

  startsWith(prefix) {
    return this._findNode(prefix) !== null;
  }

  _findNode(str) {
    let node = this.root;
    for (const char of str) {
      if (!node.children[char]) return null;
      node = node.children[char];
    }
    return node;
  }

  // Bonus: autocomplete (return all words with given prefix)
  autocomplete(prefix) {
    const node = this._findNode(prefix);
    if (!node) return [];

    const results = [];
    this._dfs(node, prefix, results);
    return results;
  }

  _dfs(node, current, results) {
    if (node.isEndOfWord) results.push(current);
    for (const [char, child] of Object.entries(node.children)) {
      this._dfs(child, current + char, results);
    }
  }

  // Bonus: Delete word
  delete(word) {
    this._deleteHelper(this.root, word, 0);
  }

  _deleteHelper(node, word, index) {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return Object.keys(node.children).length === 0;
    }

    const char = word[index];
    if (!node.children[char]) return false;

    const shouldDeleteChild = this._deleteHelper(node.children[char], word, index + 1);
    if (shouldDeleteChild) {
      delete node.children[char];
      return !node.isEndOfWord && Object.keys(node.children).length === 0;
    }
    return false;
  }
}

// --- Test ---
const trie = new Trie();
trie.insert('apple');
trie.insert('app');
trie.insert('application');
trie.insert('banana');

console.assert(trie.search('apple') === true, 'apple was inserted');
console.assert(trie.search('app') === true, 'app was inserted');
console.assert(trie.search('ap') === false, 'ap was never inserted as a full word');
console.assert(trie.startsWith('app') === true, 'app is a valid prefix');
console.assert(
  JSON.stringify(trie.autocomplete('app').sort()) === JSON.stringify(['app', 'apple', 'application'].sort()),
  'autocomplete finds all 3 app-prefixed words',
);

module.exports = { Trie, TrieNode };

// Related: 08-DSA/07-trees.md (canonical notes/theory home for Trie —
// insert/search/startsWith/autocomplete, no delete()).

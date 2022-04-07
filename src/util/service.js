import wordlist from "../wordList.js"

// Shape of BlockRow
// Key is letter
// Value is green/yellow/grey
// {
//    s: 2 t: 0 e: 0 a: 1 k: 0
// }

export async function fetchWordList() {
  try {
    const response = await fetch(wordlist)
    .then(res => res.text())
    .then(text => {
      const wordList = text.replace(/(\r\n|\n|\r)/gm, "");
      return wordList
    });
    return response.split(',')
  } catch(error) {
    throw new Error(`${error}`)
  }
}
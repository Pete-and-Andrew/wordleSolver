import wordlist from "../wordList.txt"

// Shape of BlockRow
// Key is letter
// Value is green/yellow/grey
// {
//    s: 2 t: 0 e: 0 a: 1 k: 0
// }

export const suggestWord = async (rowAnswer) => {
  const wordList = await fetch(wordlist)
    .then(res => res.text())
    .then(text => {
      return text
    });
    console.log(rowAnswer)
    
  // temp word suggestion
  return 'butch'
}
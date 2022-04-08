import wordlist from "../wordList.js"

// Shape of BlockRow
// Key is letter
// Value is green/yellow/grey
// {
//    s: 2 t: 0 e: 0 a: 1 k: 0
// }

export const defaultRowAnswers = [
  {
    id: 1, 
    word: 'steak', 
    answerKey: [
      {s: 0}, {t: 0}, {e: 0}, {a: 0}, {k: 0}
    ]
  },
  {
    id: 2, 
    word: '', 
    answerKey: []
  },
  {
    id: 3, 
    word: '', 
    answerKey: []
  },
  {
    id: 4, 
    word: '', 
    answerKey: []
  },
  {
    id: 5, 
    word: '', 
    answerKey: []
  },
  {
    id: 6, 
    word: '', 
    answerKey: []
  }
]

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
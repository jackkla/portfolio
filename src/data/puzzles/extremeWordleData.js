// Data structure for Extreme Wordle puzzles
// Each puzzle object contains:
// - id: unique identifier for the day/puzzle set
// - date: display date
// - bonusClue: the final hint phrase revealed by solving the first 3 (e.g. "WOW AMAZE ASTOUND")
// - levels: array of 4 puzzle objects (Easy, Medium, Hard, Bonus)
//   - difficulty: "Easy", "Medium", "Hard", or "Bonus"
//   - stars: 1, 2, 3, or 5
//   - clue: the word displayed to the user
//   - solution: the hidden word the user must guess
//   - greenIndices: array of 0-based indices where the clue letter matches the solution letter exactly (green)
//   - yellowIndices: array of 0-based indices where the clue letter exists in solution but wrong spot (yellow)
//   - remainder: (Optional) Override the calculated remaining letters string (e.g. to force "IRON" instead of "RONI")

export const extremeWordlePuzzles = [
  {
    id: "1",
    date: "1",
    bonusClue: "WOW AMAZE ASTOUND", // The resulting hint from remainders
    levels: [
      {
        difficulty: "Easy",
        stars: 1,
        clue: "UNCHOKE",
        solution: "KNOWHOW",
        greenIndices: [1], 
        yellowIndices: [3, 4, 5] 
      },
      {
        difficulty: "Medium",
        stars: 2,
        clue: "DROPKICK",
        solution: "KAMIKAZE",
        greenIndices: [4],
        yellowIndices: [5, 7]
      },
      {
        difficulty: "Hard",
        stars: 3,
        clue: "EMBEZZLER",
        solution: "EASTBOUND",
        greenIndices: [0],
        yellowIndices: [2]
      },
      {
        difficulty: "Bonus",
        stars: 5,
        clue: "DIAMONDBACK",
        solution: "FLABBERGAST",
        greenIndices: [2,8],
        yellowIndices: [7]
      }
    ]
  },
  {
    id: "2",
    date: "2",
    bonusClue: "CRACK METH MDMA",
    levels: [
      {
        difficulty: "Easy",
        stars: 1,
        clue: "MAHJONG",
        solution: "CARJACK",
        greenIndices: [1, 3], 
        yellowIndices: [] 
      },
      {
        difficulty: "Medium",
        stars: 2,
        clue: "PLAYLIST",
        solution: "AMETHYST",
        greenIndices: [6, 7],
        yellowIndices: [2, 3]
      },
      {
        difficulty: "Hard",
        stars: 4,
        clue: "PARANOIAC",
        solution: "MACADAMIA",
        greenIndices: [1, 3],
        yellowIndices: [6, 7, 8]
      },
      {
        difficulty: "Bonus",
        stars: 5,
        clue: "EIGHTFOLD",
        solution: "AYAHUASCA",
        greenIndices: [3],
        yellowIndices: []
      }
    ]
  },
  {
    id: "3",
    date: "3",
    bonusClue: "IRON CLUB PUTT",
    levels: [
      {
        difficulty: "Easy",
        stars: 1,
        clue: "CAPSIZED",
        solution: "ZIRCONIA",
        greenIndices: [], 
        yellowIndices: [0, 1, 4, 5],
        remainder: "IRON"
      },
      {
        difficulty: "Medium",
        stars: 2,
        clue: "SOMETHING",
        solution: "COLUMBINE",
        greenIndices: [1, 6, 7],
        yellowIndices: [2, 3]
      },
      {
        difficulty: "Hard",
        stars: 3,
        clue: "MADELEINE",
        solution: "EPAULETTE",
        greenIndices: [4, 5, 8],
        yellowIndices: [1, 3]
      },
      {
        difficulty: "Bonus",
        stars: 5,
        clue: "DISASSOCIATE",
        solution: "GREENSKEEPER",
        greenIndices: [5],
        yellowIndices: [11]
      }
    ]
  }
];

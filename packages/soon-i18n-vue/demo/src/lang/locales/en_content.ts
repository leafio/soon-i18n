const en_content = {
  world: "World",
  appleNum: "The quantity of apples",
  keepState: "Keep state",
  list: {
    apple: "Apple",
    orange: "Orange",
    pear: "Pear",
  },
  own: (count: number) =>
    count === 0
      ? "I have no apples"
      : count === 1
        ? "I have an apple"
        : `I have ${count} apples`,
  eat: (appleNum: number, pearNum: number) => {
    return (
      (appleNum === 1 ? "I have an apple" : `I have ${appleNum} apples`) +
      " and " +
      (pearNum === 1 ? "a pear" : ` ${pearNum} pears`)
    );
  },
}

export default en_content
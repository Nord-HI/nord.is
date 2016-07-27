
export const arraysEqual = (actual, expected) => (
  actual.length === expected.length &&
  actual.every((element, index) => element === expected[index])
)

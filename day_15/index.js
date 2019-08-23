const input = `
Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8
`

const ingredientPattern = (
  /(?<capacity>[-]*\d).+ (?<durability>[-]*\d).+ (?<flavor>[-]*\d).+ (?<texture>[-]*\d).+ (?<calories>\d)/
)
const namePattern = /^(?<name>\w+)/

function getProperties (line) {
  const vals = Object.fromEntries(
    Object.entries(ingredientPattern.exec(line).groups)
      .map(([key, value]) => [key, +value])
  )
  const name = namePattern.exec(line).groups.name
  return [name, vals]
}

const ingredients = new Map(
  input.trim()
    .split('\n')
    .map(getProperties)
)

function combineIngredients (first, second, third, fourth) {
  const capacity = Math.max(
    first * ingredients.get('Sprinkles').capacity +
    second * ingredients.get('Butterscotch').capacity +
    third * ingredients.get('Chocolate').capacity +
    fourth * ingredients.get('Candy').capacity,
    0
  )
  const durability = Math.max(
    first * ingredients.get('Sprinkles').durability +
    second * ingredients.get('Butterscotch').durability +
    third * ingredients.get('Chocolate').durability +
    fourth * ingredients.get('Candy').durability,
    0
  )
  const flavor = Math.max(
    first * ingredients.get('Sprinkles').flavor +
    second * ingredients.get('Butterscotch').flavor +
    third * ingredients.get('Chocolate').flavor +
    fourth * ingredients.get('Candy').flavor,
    0
  )
  const texture = Math.max(
    first * ingredients.get('Sprinkles').texture +
    second * ingredients.get('Butterscotch').texture +
    third * ingredients.get('Chocolate').texture +
    fourth * ingredients.get('Candy').texture,
    0
  )
  return capacity * durability * flavor * texture
}

function calcCalories (first, second, third, fourth) {
  return (
    first * ingredients.get('Sprinkles').calories +
    second * ingredients.get('Butterscotch').calories +
    third * ingredients.get('Chocolate').calories +
    fourth * ingredients.get('Candy').calories
  )
}

function * distribute4 (max) {
  for (let a = 0; a <= max; a++) {
    for (let b = 0; b <= max - a; b++) {
      for (let c = 0; c <= max - a - b; c++) {
        yield [a, b, c, max - a - b - c]
      }
    }
  }
}

let max = 0
for (const distribution of distribute4(100)) {
  const combination = combineIngredients(...distribution)
  const calories = calcCalories(...distribution)
  if (combination > max && calories === 500) max = combination
}
console.log(max)

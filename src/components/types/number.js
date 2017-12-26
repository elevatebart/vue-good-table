import clone from 'lodash.clone'
import def from './default'

var number = clone(def)

number.isRight = true

number.filterPredicate = function defaultFilter (rowval, filter) {
  return number.compare(rowval, filter) === 0
}

function cook (d) {
  return d.indexOf('.') >= 0 ? parseFloat(d) : parseInt(d)
}

number.compare = function compareNumbers (x, y) {
  x = typeof x === 'number' ? x : cook(x)
  y = typeof y === 'number' ? y : cook(y)
  if (x < y) {
    return -1
  } else if (x > y) {
    return 1
  } else {
    return 0
  }
}

export default number

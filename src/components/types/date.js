import { format, parse, isValid, compareAsc } from 'date-fns/esm'
import clone from 'lodash.clone'
import def from './default'

var date = clone(def)

date.isRight = true

function cook (d, column) {
  if (column && column.inputFormat) {
    return parse(d + '', '' + column.inputFormat, new Date())
  } else {
    return d
  }
}

date.compare = function compare (x, y, column) {
  x = cook(x, column)
  y = cook(y, column)
  if (!isValid(x)) {
    return -1
  }
  if (!isValid(y)) {
    return 1
  }
  return compareAsc(x, y)
}

date.format = function formatDate (v, column) {
  // convert to date
  var date = parse(v, column.inputFormat, new Date())
  return format(date, column.outputFormat)
}

export default date

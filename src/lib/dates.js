
const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

const Dates = {

  dateString: function(day, month, year) {
    let dayStr
    switch(day) {
      case '1':
        dayStr = '1st'
        break
      case '2':
        dayStr = '2nd'
        break
      case '3':
        dayStr = '3rd'
        break
      default:
        dayStr = day + 'th'
        break
    }
    return dayStr + ' ' + months[month] + ', ' + year
  }
}

export default Dates

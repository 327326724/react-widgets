var dateMath = require('./date-math')
  , globalize = require('globalize')
  , _ = require('lodash')

var dates = module.exports = _.extend({}, dateMath, {

  daysOfWeek: function(date, format){
    if (arguments.length === 1){
      format = date
      date = new Date
    }

    format = format || 'dd'

    return _.map(_.range(7), function(i){
      return  globalize.format(dateMath.weekday(date, i), format)
    })
  },

  months: function(date, format){
    if (arguments.length === 1){
      format = date
      date = new Date
    }
    format = format || 'MMM'

    return _.map(_.range(12), function(i){
      return globalize.format(dateMath.month(date, i), format)
    })
  },

  monthsInYear: function(year){
    var date = new Date(year)
    
    return _.map(_.range(12), function(i){
      return dateMath.month(date, i)
    })
  },

  firstOfDecade: function(date){
    var decade = dateMath.year(date, i) % 10

    return dateMath.subtract(date, decade, 'year')
  },

  lastOfDecade: function(date){
    return dateMath.add(dates.firstOfDecade(date), 9, 'year')
  },

  firstOfCentury: function(date){
    var decade = dateMath.year(date, i) % 100
    return dateMath.subtract(date, decade, 'year')
  },

  lastOfCentury: function(date){
    return dateMath.add(dates.firstOfCentury(date), 99, 'year')
  },

  firstVisibleDay: function(date){
    var firstOfMonth = dateMath.startOf(date, 'month')
    return dateMath.startOf(firstOfMonth, 'week');
  },

  lastVisibleDay: function(date){
    var endOfMonth = dateMath.endOf(date, 'month')
    return dateMath.endOf(endOfMonth, 'week');
  },

  visibleDays: function(date){
    var current = dates.firstVisibleDay(date)
      , last = dates.lastVisibleDay(date)
      , days = [];

    while( dateMath.lte(current, last) ) {
      days.push(dateMath.add(current, 1, 'day'))
    }

    return days
  },

  sameMonth: function(dateA, dateB){
    return dateMath.eq(dateA, dateB, 'month')
  },

  inRange: function(day, min, max, unit){
    unit = unit || 'day'

    return dateMath.gte(day, min, unit) 
        && dateMath.lte(day, max, unit)
  },

  PropTypes: {
    moment: function(props, propName, componentName){
        //if ( !moment.isMoment(props[propName]) )
          return new Error("must be a moment object")
    }
  }

})
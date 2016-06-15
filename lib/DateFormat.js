'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DateFormat = (function () {
  function DateFormat(now, format) {
    if (now === undefined) now = new Date().getTime();

    _classCallCheck(this, DateFormat);

    this.now = now;
    this.format = {
      'a_few_seconds_ago': 'a few seconds ago',
      'seconds_ago': 'seconds ago',

      'a_minute_ago': 'a minute ago',
      'minutes_ago': 'minutes ago',

      'an_hour_ago': 'an hour ago',
      'hours_ago': 'hours ago',

      'a_day_ago': 'a day ago',
      'days_ago': 'days ago',

      'a_month_ago': 'a month ago',
      'months_ago': 'months ago',

      'a_year_ago': 'a year ago',
      'years_ago': 'years ago'
    };

    this.extend(this.format, format);
  }

  _createClass(DateFormat, [{
    key: 'extend',
    value: function extend(dist, src) {
      for (var item in src) {
        if (src.hasOwnProperty(item)) dist[item] = src[item];
      }
    }
  }, {
    key: 'getNow',
    value: function getNow() {
      return this.now;
    }
  }, {
    key: 'setNow',
    value: function setNow() {
      var now = arguments.length <= 0 || arguments[0] === undefined ? +new Date() : arguments[0];

      this.now = now();
      return this.now;
    }
  }, {
    key: 'calculate',
    value: function calculate(myDate) {
      var diff = Math.abs(this.now - myDate) / 1000,
          years = Math.floor(diff / 31536000),
          months = Math.floor(diff / 2592000),
          days = Math.floor(diff / 86400),
          hours = Math.floor(diff / 3600) % 24,
          minutes = Math.floor(diff / 60) % 60,
          seconds = Math.floor(diff % 60);

      if (years > 1) return years + ' ' + this.format.years_ago;
      if (years > 0) return '' + this.format.a_year_ago;

      if (months > 1) return months + ' ' + this.format.months_ago;
      if (months > 0) return '' + this.format.a_month_ago;

      if (days > 1) return days + ' ' + this.format.days_ago;
      if (days > 0) return '' + this.format.a_day_ago;

      if (hours > 1) return hours + ' ' + this.format.hours_ago;
      if (hours > 0) return '' + this.format.an_hour_ago;

      if (minutes > 1) return minutes + ' ' + this.format.minutes_ago;
      if (minutes > 0) return '' + this.format.a_minute_ago;

      if (seconds > 20) return seconds + ' ' + this.format.seconds_ago;
      if (seconds > 0) return '' + this.format.a_few_seconds_ago;

      return '';
    }
  }, {
    key: 'print',
    value: function print(myDate) {
      if (!myDate) return '';
      return this.calculate(myDate);
    }
  }]);

  return DateFormat;
})();

exports['default'] = DateFormat;
module.exports = exports['default'];
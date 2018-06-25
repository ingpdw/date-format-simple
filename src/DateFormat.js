
export default class DateFormat {
  constructor(_now = new Date().getTime(), format, isGMT = false, dateFormat = 'YYYY. MM. DD. ') {

    this._now = _now;

    this.isGMT = isGMT;

    this.dateFormat = dateFormat;

    if (this.isGMT) {
      this._now = this.toDate(this._now).getTime();
    }

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

  extend(dist, src) {
    for (var item in src) {
      if (src.hasOwnProperty(item)) dist[item] = src[item];
    }
  }

  getDateFormat(y, m, d, h, t, s) {
    let printDate = this.dateFormat;
    if (this.dateFormat.indexOf('YYYY') === -1) {
      y = y.substring(2, 4);
    }

    printDate = printDate.replace('YYYY', y).replace('YY', y).replace('MM', m).replace('DD', d);

    if (h & t & s) {
      printDate = `${printDate} ${h}:${t}:${s}`;
    }

    return printDate;
  }

  setDateFormat(dateFormat) {
    this.dateFormat = dateFormat;
  }

  toDate(notUtc) {
    return this.toGMTDate(notUtc, true);
  }

  toGMTDate(utc, isNotUtc) {
    let clientDate = new Date();
    let zoneOffset = clientDate.getTimezoneOffset();

    if (!utc) return clientDate;

    if (isNotUtc) zoneOffset = 0;

    let _utc = utc.split('T'),
        date = _utc[0].split('-'),
        time = _utc[1].split(':');

    return new Date(date[0], parseInt(date[1], 10) - 1, date[2], time[0], parseInt(time[1], 10) - zoneOffset, time[2].split('.')[0]);
  }

  getNow() {
    return new Date(this._now);
  }

  getNowMilisecond() {
    return this._now;
  }

  setNow(now = +new Date()) {
    this._now = now;
    return this._now;
  }

  calculate(myDate) {
    let diff = Math.abs(this._now - myDate) / 1000,
        years = Math.floor(diff / 31536000),
        months = Math.floor(diff / 2592000),
        days = Math.floor(diff / 86400),
        hours = Math.floor(diff / 3600) % 24,
        minutes = Math.floor(diff / 60) % 60,
        seconds = Math.floor(diff % 60);

    if (years > 1) return `${years}${this.format.years_ago}`;
    if (years > 0) return `${this.format.a_year_ago}`;

    if (months > 1) return `${months}${this.format.months_ago}`;
    if (months > 0) return `${this.format.a_month_ago}`;

    if (days > 1) return `${days}${this.format.days_ago}`;
    if (days > 0) return `${this.format.a_day_ago}`;

    if (hours > 1) return `${hours}${this.format.hours_ago}`;
    if (hours > 0) return `${this.format.an_hour_ago}`;

    if (minutes > 1) return `${minutes}${this.format.minutes_ago}`;
    if (minutes > 0) return `${this.format.a_minute_ago}`;

    if (seconds > 20) return `${seconds}${this.format.seconds_ago}`;
    if (seconds > 0) return `${this.format.a_few_seconds_ago}`;

    return ``;
  }

  _format(_date, isOnlyDate) {
    let y = _date.getFullYear(),
        m = ('0' + (_date.getMonth() + 1)).slice(-2),
        d = ('0' + _date.getDate()).slice(-2),
        h = ('0' + _date.getHours()).slice(-2),
        t = ('0' + _date.getMinutes()).slice(-2),
        s = ('0' + _date.getSeconds()).slice(-2);

    if (isOnlyDate) return this.getDateFormat(y, m, d);

    return this.getDateFormat(y, m, d, h, t, s);
  }

  diffDate(date1, date2) {
    if (!date1 || !date2) return 0;
    return Math.abs(date2.getTime() - date1.getTime()) / 1000;
  }

  printUntil(date, type = 'month', isOnlyDate) {
    let myDate = this.printFull(date, false, true);
    let now = this.getNow();
    let diff = this.diffDate(myDate, now);
    let years = Math.floor(diff / 31536000);
    let months = Math.floor(diff / 2592000);
    let days = Math.floor(diff / 86400);

    if (years > 0 && type == 'year') {
      return this._format(new Date(myDate), isOnlyDate);
    }

    if (months > 0 && type == 'month') {
      return this._format(new Date(myDate), isOnlyDate);
    }

    if (days > 0 && type == 'day') {
      return this._format(new Date(myDate), isOnlyDate);
    }

    return this.calculate(new Date(myDate));
  }

  printOnlyDate(utc) {
    return this.printFull(utc, true);
  }

  printFull(utc, isOnlyDate, isPrintDate) {
    let clientDate = new Date(),
        _date,
        _time;
    let zoneOffset = clientDate.getTimezoneOffset();

    if (!utc) return clientDate;

    if (utc.indexOf('T') == -1) {
      return this._format(new Date(utc));
    }

    utc = utc.split('T');
    _date = utc[0].split('-');
    _time = utc[1].split(':');

    let y = _date[0],
        m = parseInt(_date[1], 10) - 1,
        d = _date[2],
        h = _time[0],
        t = parseInt(_time[1], 10) - zoneOffset,
        s = _time[2].split('.')[0],
        _newDate = new Date(y, m, d, h, t, s);

    if (isPrintDate) return _newDate;

    return this._format(_newDate, isOnlyDate);
  }

  print(myDate) {
    if (!myDate) return '';
    return this.calculate(myDate);
  }
}
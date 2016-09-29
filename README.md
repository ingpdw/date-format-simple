# date-format-simple

simple JavaScript date library for formatting dates.

## output
* a few seconds ago
* 30 seconds ago
* a minute ago
* 3 minutes ago
* an hour ago
* 5 hours ago
* a days ago
* 30 days ago
* a month ago
* 11 months ago
* a year ago
* 2 years ago

## Install

```
$npm install date-format-simple
```

## Usage

```
var DateFormat = require( 'date-format-simple' );

var today = new Date();
var myDate = new Date( 2015, 5, 10 );

var dateFormat = new DateFormat( today.getTime() );
dateFormat.print( myDate.getTime() );

dateFormat.toGMTDate( '2016-02-02T07:09:32.277Z' );

```

## API
```
new DateFormat( milisecond, [options] );
```

```
var dateFormat = new DateFormat( milisecond );
dateFormat.print( milisecond );
```

## options

```
var dateFormat = new DateFormat( 2016, 3, 10, {
  'a_few_seconds_ago': 'just now',
  'months_ago': 'months ago~ :D'
});

dateFormat.print( new Date( 2016, 1, 10 ) );
//result => 2 months ago~ :D

dateFormat.print( new Date( 2016, 3, 9, 23, 59, 59 ) );
//result => just now
```

## default options

```
{
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
}
```

## build
* npm install babel -g
* npm run compile

## Test
* npm install mocha -g
* npm test

## License
© 2016 ingpdw. MIT License

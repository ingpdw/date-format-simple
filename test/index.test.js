var DateFormat = require( '..' ),
    assert = require( 'assert' );

var dateFormat, today, now;



describe('DateFormat class', function() {
  beforeEach(function() {
    now = new Date( 2016, 10, 10 );
    dateFormat = new DateFormat( +now );
  });

  describe('GMTDate', function() {
    it('should be 2016-07-19T00:52:53.280Z', function() {
      var d = dateFormat.toGMTDate( '2016-07-11T07:09:32.277Z' );
    });
  });

  describe('second', function() {
    it('should be a few seconds ago.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 59 );
      assert.equal( dateFormat.print( today ), 'a few seconds ago' );
    });

    it('should be 30 seconds ago.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 30 );
      assert.equal( dateFormat.print( today ), '30 seconds ago' );
    });

    it('19 seconds ago should a few seconds ago.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 41 );
      assert.equal( dateFormat.print( today ), 'a few seconds ago' );
    });

    it('20 seconds ago should a few seconds ago.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 40 );
      assert.equal( dateFormat.print( today ), 'a few seconds ago' );
    });

    it('21 seconds ago should 21 seconds ago.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 39 );
      assert.equal( dateFormat.print( today ), '21 seconds ago' );
    });
  });

  describe('minute', function() {
    it('should be a minute ago.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 00 );
      assert.equal( dateFormat.print( today ), 'a minute ago' );
    });

    it('should be 2 minutes ago.', function() {
      today = new Date( 2016, 10, 9, 23, 58, 00 );
      assert.equal( dateFormat.print( today ), '2 minutes ago' );
    });

  });

  describe('day', function() {
    it('should be a day ago.', function() {
      today = new Date( 2016, 10, 9 );
      assert.equal( dateFormat.print( today ), 'a day ago' );
    });

    it('should be 2 days ago.', function() {
      today = new Date( 2016, 10, 8 );
      assert.equal( dateFormat.print( today ), '2 days ago' );
    });

    it('should be 8 days ago.', function() {
      today = new Date( 2016, 10, 2 );
      assert.equal( dateFormat.print( today ), '8 days ago' );
    });
  });

  describe('month', function() {
    it('should be a month ago.', function() {
      today = new Date( 2016, 9, 8 );
      assert.equal( dateFormat.print( today ), 'a month ago' );
    });

    it('should be 2 month ago.', function() {
      today = new Date( 2016, 8, 1 );
      assert.equal( dateFormat.print( today ), '2 months ago' );
    });

    it('should be 8 month ago.', function() {
      today = new Date( 2016, 2, 9, 12, 10, 1 );
      assert.equal( dateFormat.print( today ), '8 months ago' );
    });
  });

  describe('year', function() {
    it('should be a year ago.', function() {
      today = new Date( 2015, 9, 8 );
      assert.equal( dateFormat.print( today ), 'a year ago' );
    });

    it('should be 2 years ago.', function() {
      today = new Date( 2014, 8, 1 );
      assert.equal( dateFormat.print( today ), '2 years ago' );
    });
  });
});

describe('DateFormat class option', function() {
  beforeEach(function() {
    now = new Date( 2016, 10, 10, 00, 00, 00 );
    dateFormat = new DateFormat( +now, {
      'a_few_seconds_ago': 'just now',
      'seconds_ago': 'seconds ago~',
      'a_minute_ago': '1minute ago~',
      'minutes_ago': 'minutes ago~',
      'an_hour_ago': '1hour ago~',
      'hours_ago': 'hours ago~',
      'a_day_ago': '1 days ago~',
      'days_ago': 'days ago~',
      'a_month_ago': '1month ago~',
      'months_ago': 'months ago~',
      'a_year_ago': '1 year ago~',
      'years_ago': 'years ago~'
    });
  });

  describe('message', function() {
    it('should be just now.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 59 );
      assert.equal( dateFormat.print( today ), 'just now' );
    });

    it('should be just now.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 41 );
      assert.equal( dateFormat.print( today ), 'just now' );
    });

    it('should be 30 seconds age~.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 30 );
      assert.equal( dateFormat.print( today ), '30 seconds ago~' );
    });

    it('should be 1minute ago.', function() {
      today = new Date( 2016, 10, 9, 23, 59, 00 );
      assert.equal( dateFormat.print( today ), '1minute ago~' );
    });

    it('should be 10 minutes ago.', function() {
      today = new Date( 2016, 10, 9, 23, 50, 00 );
      assert.equal( dateFormat.print( today ), '10 minutes ago~' );
    });

    it('should be 11 hours ago.', function() {
      today = new Date( 2016, 10, 9, 12, 50, 00 );
      assert.equal( dateFormat.print( today ), '11 hours ago~' );
    });

    it('should be 1hour ago.', function() {
      today = new Date( 2016, 10, 9, 22, 50, 00 );
      assert.equal( dateFormat.print( today ), '1hour ago~' );
    });

    it('should be 11 days ago.', function() {
      today = new Date( 2016, 9, 30, 00, 00, 00 );
      assert.equal( dateFormat.print( today ), '11 days ago~' );
    });

    it('should be 1month ago.', function() {
      today = new Date( 2016, 9, 1, 00, 00, 00 );
      assert.equal( dateFormat.print( today ), '1month ago~' );
    });

    it('should be 4 months ago.', function() {
      today = new Date( 2016, 6, 1, 00, 00, 00 );
      assert.equal( dateFormat.print( today ), '4 months ago~' );
    });

    it('should be 1 year ago.', function() {
      today = new Date( 2015, 6, 1, 00, 00, 00 );
      assert.equal( dateFormat.print( today ), '1 year ago~' );
    });

    it('should be 4 years ago.', function() {
      today = new Date( 2012, 6, 1, 00, 00, 00 );
      assert.equal( dateFormat.print( today ), '4 years ago~' );
    });
  });
});

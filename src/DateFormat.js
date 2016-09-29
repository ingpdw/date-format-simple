
export default class DateFormat {
  constructor( now = new Date().getTime(), format ) {
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
    }

    this.extend( this.format, format );
  }

  extend( dist, src ){
    for (var item in src ) {
      if ( src.hasOwnProperty( item ) ) dist[ item ] = src[ item ];
    }
  }

  toGMTDate( utc ) {
  	var clientDate = new Date();

  	if ( !utc ) return clientDate;

    var utc = utc.split( 'T' ),
        date = utc[ 0 ].split( '-' ),
        time = utc[ 1 ].split( ':' );

  	return new Date( date[ 0 ],
      parseInt( date[ 1 ], 10 ) - 1,
      date[ 2 ],
      time[ 0 ],
      parseInt( time[ 1 ], 10 ) - clientDate.getTimezoneOffset(),
      time[ 2 ].split( '.' )[ 0 ] );
  }

  getNow() {
    return this.now;
  }

  setNow( now = +new Date ) {
    this.now = now();
    return this.now;
  }

  calculate( myDate ) {
        let diff = Math.abs( this.now - myDate) / 1000,
        years = Math.floor(diff / 31536000),
        months = Math.floor( diff / 2592000 ),
        days = Math.floor(diff / 86400),
        hours = Math.floor(diff / 3600) % 24,
        minutes = Math.floor(diff / 60) % 60,
        seconds = Math.floor(diff % 60);

        if( years > 1 ) return `${ years }${this.format.years_ago}`;
        if( years > 0 ) return `${this.format.a_year_ago}`;

        if( months > 1 ) return `${ months }${this.format.months_ago}`;
        if( months > 0 ) return `${this.format.a_month_ago}`;

        if( days > 1 ) return `${ days }${this.format.days_ago}`;
        if( days > 0 ) return `${this.format.a_day_ago}`;

        if( hours > 1 ) return `${ hours }${this.format.hours_ago}`;
        if( hours > 0 ) return `${this.format.an_hour_ago}`;

        if( minutes > 1 ) return `${ minutes }${this.format.minutes_ago}`;
        if( minutes > 0 ) return `${this.format.a_minute_ago}`;

        if( seconds > 20 ) return `${ seconds }${this.format.seconds_ago}`;
        if( seconds > 0 ) return `${this.format.a_few_seconds_ago}`;

        return ``;
  }

  print( myDate ) {
    if( !myDate ) return '';
    return this.calculate( myDate );
  }
}

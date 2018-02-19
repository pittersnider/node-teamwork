'use strict';

const moment = require('moment');

const regex = {
    convertsTimestring: () => /^([0-9]+\.[0-9]+)$/ig
};

class Helper {

    /**
     * Returns the current date in TeamWork format.
     */
    static date() {
        return moment().format('YYYYMMDD');
    }

    /**
     * Returns the current time in TeamWork format.
     */
    static time() {
        return moment().format('HH:mm');
    }

    /**
     * Converts decimal number to hour and minutes,
     *  then subtract from the current moment or from
     *  the specified 'from' moment.
     * 
     * FIXME: Separar em duas funções.
     * 
     */
    static convertsTimestring(options = { string: '', from: moment() }) {

        const time = { hour: 0, minutes: 0 };
        let pattern = regex.convertsTimestring();

        if ((pattern = pattern.exec(options.string))) {

            let timeInMinutes = Number.parseFloat(pattern[1]) * 60;
            time.minutes = timeInMinutes % 60;
            time.hour = (timeInMinutes - time.minutes) / 60;

        }

        return options.from.subtract(time.hour, 'h').subtract(time.minutes, 'm').format('HH:mm');

    }

}

module.exports = Helper;

import _ from 'lodash';

import parseDigit from './parse-digit.js';

export default function parseNumber(number) {

    var digits = [];

    _.times(9, (index) => {
        
        // advance the position since we're using 3 chars per line per number
        var position = index * 3;

        // use our magic parse digit helper to convert our string representation of a digit
        digits[index] = parseDigit(number.substr(position, 3) + number.substr(position + 27, 3) + number.substr(position + 54, 3));
    
    });

    return digits.join('');

}
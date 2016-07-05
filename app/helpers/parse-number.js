import _ from 'lodash';

import parseDigit from './parse-digit.js';

export default function parseNumber(number) {

    var digits = [];

    _.times(9, function(index) {
        var position = index * 3;
        digits[index] = parseDigit(number.substr(position, 3) + number.substr(position + 27, 3) + number.substr(position + 54, 3));
    });

    return digits.join('');

}
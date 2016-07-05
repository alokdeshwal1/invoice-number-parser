import logger from './logger.js';
import safeStringify from './safe-stringify.js';
import localStorage from './local-storage.js';
import parseNumber from './parse-number.js';
import parseDigit from './parse-digit.js';

class Helpers {

    constructor() {
        this.logger = logger;
        this.safeStringify = safeStringify;
        this.localStorage = localStorage;
        this.parseNumber = parseNumber;
        this.parseDigit = parseDigit;
    }
}

const helpers = new Helpers();

export default helpers;
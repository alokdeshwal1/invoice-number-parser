export default function parseDigit(digit) {

    // a super straight forward approach to convert our digit representation (9 chars string) into an actual digit
    // at first I was using an array representation for every digit but it was over engineered :)

    /*
      _    _  _     _  _  _  _  _
     | | | _| _||_||_ |_   ||_||_|
     |_| ||_  _|  | _||_|  ||_| _|

    */

    switch(digit) {

        case ' _ | ||_|':
            return 0;
        case '     |  |':
            return 1;
        case ' _  _||_ ':
            return 2;
        case ' _  _| _|':
            return 3;
        case '   |_|  |':
            return 4;
        case ' _ |_  _|':
            return 5;
        case ' _ |_ |_|':
            return 6;
        case ' _   |  |':
            return 7;
        case ' _ |_||_|':
            return 8;
        case ' _ |_| _|':
            return 9;
        default:
            return '?';

    }

}
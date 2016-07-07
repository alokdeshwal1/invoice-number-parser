import _ from 'lodash';

export default function downloadFile(numbers, filename) {

    // a super straight forward approach to save a text file (not using Blob)

    var link = document.createElement('a'),
        data = '';

    // build the content of the file out of our invoice numbers array (this is where we add the second column)
    _.each(numbers, (number) => {
        data += number + (_.includes(number, '?') ? ' ILLEGAL' : '') + '\n';
    });

    // set up the link data
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);

    // set up a filename
    link.download = 'output_' + filename || 'output.txt';

    // attach the link to the DOM + click on it to download + remove it from DOM
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}
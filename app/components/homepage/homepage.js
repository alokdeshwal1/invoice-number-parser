import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import helpers from '../../helpers/helpers.js';
import iconsConstants from '../../constants/icons-constants.js';

var Homepage = React.createClass({

    getInitialState: function() {

        return {
            isProcessing: false,
            outputFile: null,
            outputFileName: null,
            processedNumbers: null,
            errorMessage: null
        }

    },

    readFile: function(e) {

        helpers.logger('[Homepage] readFile');

        var reader = new FileReader(),
            file = e.target.files[0],
            allowedFileTypes = ['text/plain'];

        // validate input file
        if (!file) {
            this.setState({errorMessage: 'Invalid input file'});
            return;
        }

        // validate input file for allowed file extensions
        if (!_.includes(allowedFileTypes, file.type)) {
            this.setState({errorMessage: 'Only plain text files are allowed'});
            return;
        }

        // TODO: validate maximum file size
        // TODO: read file by small chunks to improve performance for large files
        
        reader.onload = () => {
            this.processFile(reader.result, file.name);
        };

        // read the file using FileReader HTML5 API
        reader.readAsText(file);

    },

    processFile: function(file, filename) {

        helpers.logger('[Homepage] processFile');

        var lines = file.split('\n'), // split file into lines
            length = lines.length, // calculate the total number of lines 
            amount = _.floor(length / 4), // calculate the number of invoice numbers (4 lines per invoice number)
            numbers = []; // this will store our output numbers

        this.setState({
            isProcessing: true,
            processedNumbers: amount,
            errorMessage: null
        });

        _.times(amount, (index) => {

            var position = index * 4, // we advance by 4 since we use 4 lines for each number
                invoiceNumber = lines[position].substr(0, 27) + lines[position + 1].substr(0, 27) + lines[position + 2].substr(0, 27); // our number is now represented as a one liner string

            // use our magic parse number helper to convert our string representation of a number
            numbers.push(helpers.parseNumber(invoiceNumber));

        });

        _.delay(() => {

            this.setState({
                isProcessing: false,
                outputFile: numbers,
                outputFileName: filename
            });

        }, 1000);

    },

    downloadFile: function() {

        helpers.logger('[Homepage] downloadFile');

        var state = this.state;

        helpers.downloadFile(state.outputFile, state.outputFileName);

    },

    restart: function() {

        helpers.logger('[Homepage] restart');

        this.setState({
            isProcessing: false,
            outputFile: null,
            outputFileName: null,
            processedNumbers: null,
            errorMessage: null
        });

    },

    render: function () {

        helpers.logger('[Homepage] render');

        var state = this.state,
            roundButton, // button element
            snackBar; // footer element

        // TODO: convert roundButton and snackBar into sub components
        
        if (state.outputFile) {

            roundButton = (
                <div className="wrapper">
                    <label className="start" onClick={this.downloadFile}>
                        <span>Download</span>
                    </label>
                </div>
            );

            snackBar = (
                <footer>
                    <p><i className={iconsConstants.CHECK} /> <strong>{state.processedNumbers}</strong> invoice numbers were processed! <span className="restart hint--top" data-hint="Click to restart" onClick={this.restart}>Restart?</span></p>
                </footer>
            );

        } else if (state.isProcessing) {

            roundButton = (
                <div className="wrapper">
                    <label className="start">
                        <span>Processing</span>
                    </label>
                </div>
            );

            snackBar = (
                <footer>
                    <p><i className={iconsConstants.INFO} /> Processing <strong>{state.processedNumbers}</strong> invoice numbers...</p>
                </footer>
            );

        } else {

            roundButton = (
                <div className={classNames('wrapper', 'hint--top')} data-hint="Click here to select the file you would like to convert">
                    <label className="start">
                        <input type="file" onChange={this.readFile} />
                        <span>Start</span>
                    </label>
                </div>
            );

            snackBar = (
                <footer>
                    {state.errorMessage
                        ? <p><i className={iconsConstants.WARNING} /> {state.errorMessage}</p>
                        : <p><i className={iconsConstants.INFO} /> Click on the Start button to select your input file</p>
                    }
                </footer>
            );

        }

        return (
            <section className="box-row box-homepage">

                {roundButton}

                {snackBar}

            </section>
        );
    }
});

export default Homepage;
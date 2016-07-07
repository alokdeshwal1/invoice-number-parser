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

        var state = this.state,
            reader = new FileReader(),
            file = e.target.files[0],
            allowedFileTypes = ['text/plain'];

        if (state.isProcessing) {
            return;
        }

        if (file && !_.includes(allowedFileTypes, file.type)) {
            this.setState({errorMessage: 'Only plain text files are allowed, please try again.'});
            return;
        }

        if (file) {
            reader.readAsText(file);
        }

        reader.onload = () => {
            this.processFile(reader.result, file.name);
        };

    },

    processFile: function(file, filename) {

        helpers.logger('[Homepage] processFile');

        var lines = file.split('\n'),
            length = lines.length,
            amount = _.floor(length / 4),
            numbers = [];

        this.setState({
            isProcessing: true,
            processedNumbers: amount,
            errorMessage: null
        });

        _.times(amount, (index) => {
            var position = index * 4;
            numbers.push(helpers.parseNumber(lines[position].substr(0, 27) + lines[position + 1].substr(0, 27) + lines[position + 2].substr(0, 27)));
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

        var state = this.state;

        if (state.outputFile) {
            return (
                <section className="box-row box-homepage">

                    <div className='wrapper'>
                        <label className="start" onClick={this.downloadFile}>
                            <span>Download</span>
                        </label>
                    </div>

                    <footer>
                        <p><i className={iconsConstants.CHECK} /> <strong>{state.processedNumbers}</strong> invoice numbers were processed! <span className="restart hint--top" data-hint="Click to restart" onClick={this.restart}>Restart?</span></p>
                    </footer>
                    
                </section>
            )
        }

        if (state.isProcessing) {
            return (
                <section className="box-row box-homepage">

                    <div className='wrapper'>
                        <label className="start">
                            <span>Processing</span>
                        </label>
                    </div>

                    <footer>
                        <p><i className={iconsConstants.INFO} /> Processing <strong>{state.processedNumbers}</strong> invoice numbers...</p>
                    </footer>

                </section>
            );
        }

        return (
            <section className="box-row box-homepage">

                <div className={classNames('wrapper', 'hint--top')} data-hint="Click here to select the file you would like to convert">
                    <label className="start">
                        <input type="file" onChange={this.readFile} />
                        <span>Start</span>
                    </label>

                </div>

                <footer>
                    {state.errorMessage
                        ? <p><i className={iconsConstants.WARNING} /> {state.errorMessage}</p>
                        : <p><i className={iconsConstants.INFO} /> Click on the Start button to select your input file</p>
                    }
                </footer>

            </section>
        );
    }
});

export default Homepage;
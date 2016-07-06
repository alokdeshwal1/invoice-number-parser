import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import helpers from '../../helpers/helpers.js';

var Homepage = React.createClass({

    getInitialState: function() {

        return {
            file: null
        }

    },

    readFile: function(e) {

        helpers.logger('[Homepage] readFile');

        var reader = new FileReader(),
            file = e.target.files[0],
            allowedFileTypes = ['text/plain'],
            numbers = [];

        if (file && !_.includes(allowedFileTypes, file.type)) {
            console.log('Please choose a valid image file');
            return;
        }

        if (file) {
            reader.readAsText(file);
        }

        reader.onload = function() {

            var text = reader.result,
                lines = text.split('\n'),
                length = lines.length,
                amount = _.floor(length / 4);

            _.times(amount, function(index) {
                var position = index * 4;
                numbers.push(helpers.parseNumber(lines[position].substr(0, 27) + lines[position + 1].substr(0, 27) + lines[position + 2].substr(0, 27)));
            });

            console.log(numbers);

            console.log('**********************');

            _.each(numbers, (number) => {
               console.log(number + '\n');
            });

            console.log('**********************');

        };

    },

    render: function () {

        helpers.logger('[Homepage] render');

        var props = this.props,
            state = this.state;

        console.log(state);

        return (
            <section className="box-row box-homepage">

                <div className="wrapper">
                    <label className="start">
                        <input type="file" ref="file" onChange={this.readFile} />
                        <span>Drag your files here</span>
                    </label>
                </div>

            </section>
        );
    }
});


function mapStateToProps(state) {
    return {
        shows: _.get(state, 'homepage.shows', [])
    };
}

export default connect(mapStateToProps)(Homepage);
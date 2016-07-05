import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import helpers from '../../helpers/helpers.js';

var Homepage = React.createClass({

    readFile: function(e) {

        helpers.logger('[Homepage] readFile');

        var props = this.props,
            state = this.state,
            reader = new FileReader(),
            file = e.target.files[0],
            allowedFileTypes = ['text/plain'];

        if (file && !_.includes(allowedFileTypes, file.type)) {
            console.log('Please choose a valid image file');
            return;
        }

        reader.onload = function() {
            console.log(reader.result);
        };

        if (file) {
            reader.readAsBinaryString(file);
        }

    },

    render: function () {

        helpers.logger('[Homepage] render');

        return (
            <section className="box-row box-homepage">

                <label className="start">
                    <input type="file" ref="file" onChange={this.readFile} />
                    <span>Drag your files here</span>
                </label>

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
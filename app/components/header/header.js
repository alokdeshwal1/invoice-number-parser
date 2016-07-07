import _ from 'lodash';
import React from 'react';
import helpers from '../../helpers/helpers.js';

var Header = React.createClass({

    render: function () {

        helpers.logger('[Header] render');

        return (
            <header>
                <span className="logo">Invoice Number Parser</span>
            </header>
        );
    }
});

export default Header;
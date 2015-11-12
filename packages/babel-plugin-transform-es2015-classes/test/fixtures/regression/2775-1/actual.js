var _ = require('underscore'),
    React = require('react');

class Hello extends React.Component
{
    state = {
        hello: 1
    };

/*
    constructor() {
        super();
    }
*/

    render() {
        var props = _.omit(this.props, 'children');
        return (
            <p className="1" {... props}>Hello</p>
        );
    }

    foo(param = 1) {
        this.param = param;
    }
}

module.exports = Hello;

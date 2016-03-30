let React = require('react');
let Layout = require('./layout');
const Login = React.createClass({
    render: function() {
        let{title} = this.props;
        return (
            <Layout title={title}>
                <div className="row">
                    123
                </div>

            </Layout>
        )
    }
});
module.exports = Login;
let React = require('react');
let Layout = require('./layout');
const Login = React.createClass({
    render: function() {
        let{title} = this.props;
        return (
            <Layout title={title}>
                <div className="row" id="login">
                </div>
            </Layout>
        )
    }
});
module.exports = Login;
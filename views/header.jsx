let React = require('react');
var Header = React.createClass({
    render: function() {
        return (
            <div>
            <div className="jumbotron">
                <h1>Hello, NodeJs!</h1>

            </div>
                <ol className="breadcrumb">
                    <li><a href="#">首页</a></li>
                    <li><a href="#">给我留言</a></li>
                </ol>
            </div>
        )
    }
});
module.exports = Header;
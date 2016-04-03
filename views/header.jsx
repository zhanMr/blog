let React = require('react');
var Header = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-fixed-top navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="true" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Node Blog</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse in" aria-expanded="true">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="/index">首页</a></li>
                            <li><a href="/message">留言</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});
module.exports = Header;
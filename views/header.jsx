let React = require('react');
var Header = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <link href="/stylesheets/bootstrap.min.css" rel="stylesheet"/>
                </head>
                <body>
                    <div className="container">
                        {this.props.children}
                    </div>
                    <script src="/javascripts/jquery-1.12.2.min.js"></script>
                    <script src="/javascripts/bootstrap.min.js"></script>
                </body>
            </html>
        )
    }
});
module.exports = Header;
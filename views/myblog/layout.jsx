let React = require('react');
let Header = require('./header');
var Layout = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <link href="/css/bootstrap.min.css" rel="stylesheet"/>
                    <link href="/css/blog.css" rel="stylesheet"/>
                </head>
                <body>
                    <Header/>
                    <div className="container">
                        {this.props.children}
                    </div>
                    <script src="/js/end_bundle.js"></script>
                </body>
            </html>
        )
    }
});
module.exports = Layout;
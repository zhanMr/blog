let React = require('react');
let Header = require('./header');
let Layout = React.createClass({
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
                        <div className="row row-offcanvas row-offcanvas-right">
                            <div className="col-xs-12 col-sm-9">{this.props.children}</div>
                            <div class="col-xs-6 col-sm-3 sidebar-offcanvas"></div>
                        </div>
                    </div>
                    <script src="/js/fore_bundle.js"></script>
                </body>
            </html>
        )
    }
});
module.exports = Layout;
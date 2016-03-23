let React = require('react');
let Header = require('./Header');
const Index = React.createClass({
        render: function() {
            console.log('xxx');
            return (
                   <Header title={this.props.title}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-8">
                                {this.props.data}
                            </div>
                        </div>
                   </Header>
                )
        }
});
module.exports = Index;
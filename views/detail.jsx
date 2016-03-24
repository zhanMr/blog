let React = require('react');
let Layout = require('./layout');
let Calendar = require('./calendar');
let CalendarDemo = React.createClass({
    getDefaultProps: function(){
        return {
            holiday: {
                '3/8': '妇女节'
            }
        }
    },
    render: function(){
        return <Calendar {...this.props}/>;
    }
});
const Index = React.createClass({
    render: function() {
        let{data, title} = this.props;
        return (
            <Layout title={title}>
                <div className="row">
                    <div className="col-md-8 blog_art">
                        <article>
                            <h1>{data[0].title}</h1>
                            <p className="introduction">{data[0].introduction}</p>
                        </article>
                    </div>
                    <div className="col-md-4" style={{background:"#fff"}}>
                        <CalendarDemo/>
                    </div>
                </div>
            </Layout>
        )
    }
});
module.exports = Index;
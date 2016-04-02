const React = require('react');
const showdown  = require('showdown');
const converter = new showdown.Converter();
const Layout = require('./layout');
const Calendar = require('./calendar');
const CalendarDemo = React.createClass({
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
                            <h1>{data.title}</h1>
                            <p>摘要1</p>
                            <p className="introduction">{data.introduction}</p>
                            <p>内容2</p>
                            <div dangerouslySetInnerHTML={{__html: converter.makeHtml(data.content.toString())}}></div>
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
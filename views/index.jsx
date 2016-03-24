let React = require('react');
let Layout = require('./layout');
let Page = require('./page');
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
            let{data, title, page, total} = this.props;
            return (
                   <Layout title={title}>
                        <div className="row">
                            <div className="col-md-8 blog_art">
                                {data.map((item, key) =>{
                                    return (
                                        <article key={key}>
                                            <h1><a href={`/detail?id=${item.id}`}>{item.title}</a></h1>
                                            <p className="introduction">{item.introduction}...</p>
                                        </article>
                                    )
                                })}
                                <Page page={page} total={Math.ceil(total/5)} view={'page'}/>
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
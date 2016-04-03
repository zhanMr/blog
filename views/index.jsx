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
                        <div className="row row-offcanvas row-offcanvas-right">
                            <div className="col-xs-12 col-sm-9">
                                <div className="media blog">
                                    {data.map((item, key) =>{
                                            return (
                                                <article key={key} className="media">
                                                    <h3 className="media-heading"><a href={`/detail?id=${item.id}`}>{item.title}</a></h3>
                                                    <p className="introduction">{item.introduction}</p>
                                                    <p class="text-left"><a href={`/detail?id=${item.id}`}>阅读全文</a></p>
                                                </article>
                                            )
                                        })}
                                </div>
                                <Page page={page} total={Math.ceil(total/5)} view={'index'}/>
                            </div>
                            <div className="col-xs-6 col-sm-3 sidebar-offcanvas"></div>
                        </div>
                   </Layout>
                )
        }
});
module.exports = Index;
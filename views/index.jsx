let React = require('react');
let Layout = require('./layout');
let Page = require('./public/page');
const Index = React.createClass({
        render: function() {
            let{data, title, page, total} = this.props;
            return (
                   <Layout title={title}>
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
                        <Page page={page} total={Math.ceil(total/9)} view={'index'}/>
                   </Layout>
                )
        }
});
module.exports = Index;
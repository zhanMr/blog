//分页
let React = require('react');
let Page = React.createClass({
    render: function(){
        let{page, total, view} = this.props;
        let link = [];
        let startPage = 1;
        //起始页
        if(page + 5 >= total){
            startPage = total - 5;
        }else{
            startPage = page;
        }
        for(let num = startPage; num <= startPage + 5; num ++){
            link.push(<li><a href={`/${view}?page=${num}`}>{num}</a></li>);
        }
        let prev = total > 1 && page != 1 ? <li><a href={`/${view}?page=${page - 1}`} aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li> : '';
        let next = page < total ? <li><a href={`/${view}?page=${page + 1}`} aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li> : '';
        return (
                <nav>
                    <ul className="pagination">
                        {prev}
                        {link}
                        {next}
                    </ul>
                </nav>
        )
    }
});
module.exports = Page;
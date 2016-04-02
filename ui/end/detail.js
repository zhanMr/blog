import $ from 'jquery';
import ReactDom  from 'react-dom';
import React from 'react';
const Message = React.createClass({
    getDefaultProps: function(){
        return{
            data: []
        }
    },
    getInitialState: function(){
        return {
            data: this.props.data
        }
    },
    //加载留言
    componentDidMount: function(){
        var self = this;
        $.ajax({
            type: 'post',
            url: '/myblog/detail',
            success: function(msg){
                self.setState({
                    data: msg.data
                });
            },
            error: function(){
                alert('网络错误，请重试!');
            }
        });
    },
    removeDetail: function(id){
        var self = this;
        $.ajax({
            type: 'post',
            url: '/myblog/detail/remove',
            data:{
                id: id
            },
            success: function(msg){
                let data = self.state.data.filter(function(item){
                    return item.id !== id;
                });
                self.setState({
                    data: data
                });
            },
            error: function(){
                alert('网络错误，请重试!!');
            }
        });
    },
    render: function() {
        return (
            <div className="panel panel-default">
                <table className="table">
                    <tbody>
                        {this.state.data.map((item, key) =>{
                            return (
                                <tr key={key}><td>{key + 1}</td><td><a href={`/myblog/detail_info?id=${item.id}`}>{item.title}</a></td><td>{item.os}</td><td>{item.time}</td><td onClick={this.removeDetail.bind(this, item.id)}>删除</td></tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
});
export default Message;
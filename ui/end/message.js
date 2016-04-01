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
            url: '/myblog/message',
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
    removeMessage: function(id){
        var self = this;
        $.ajax({
            type: 'post',
            url: '/myblog/message/remove',
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
                alert('网络错误，请重试!');
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
                                <tr key={key}><td>{item.message}</td><td>{item.os}</td><td>{item.time}</td><td onClick={this.removeMessage.bind(this, item.id)}>删除</td></tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
});
export default Message;
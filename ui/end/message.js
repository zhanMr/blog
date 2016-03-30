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
            error: function(msg){
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
                self.setState({
                    data: msg.data
                });
            },
            error: function(msg){
                alert('网络错误，请重试!');
            }
        });
    },
    render: function() {
        let data = this.state.data;
        return (
            <div className="panel panel-default">
                <table className="table">
                    <tbody>
                        {data.map((item, key) =>{
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
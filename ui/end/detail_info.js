import $ from 'jquery';
import ReactDom  from 'react-dom';
import React from 'react';
const Message = React.createClass({
    getDefaultProps: function(){
        return{
            title: '',
            introduction: '',
            content: ''
        }
    },
    getInitialState: function(){
        return {
            title: this.props.title,
            introduction:this.props.introduction,
            content: this.props.content
        }
    },
    pullContent: function(){
        var self = this;
        $.ajax({
            type: 'post',
            url: '/myblog/detail_info/update',
            data:{
                id: location.search.replace("?id=","") || 0,
                title: self.state.title,
                introduction: self.state.introduction,
                content: self.state.content
            },
            success: function(msg){
                location.href = '/myblog/detail';
            },
            error: function(){
                alert('网络错误，请重试!');
            }
        });
    },
    handleChange: function(e){
        this.setState({[e.target.name]: e.target.value});
    },
    //加载留言//
    componentDidMount: function(){
        var self = this;
        $.ajax({
            type: 'post',
            url: '/myblog/detail_info',
            data:{
                id: location.search.replace("?id=","") || 0
            },
            success: function(msg){
               if(msg && msg.data && msg.data.length){
                   let data = msg.data[0];
                   self.setState({
                       title: data.title,
                       introduction: data.introduction,
                       content: data.content
                   });
               }
            },
            error: function(){
                alert('网络错误，请重试!');
            }
        });
    },
    render: function() {

        return (
            <div className="panel panel-default">
                <p><input className="form-control" value={this.state.title} onChange={this.handleChange} name="title"/></p>
                <p><textarea className="form-control" value={this.state.introduction} onChange={this.handleChange} style={{height:'200px'}} name="introduction"></textarea></p>
                <p><textarea className="form-control" value={this.state.content} onChange={this.handleChange} style={{height:'200px'}} name="content"></textarea></p>
                <p><a className="form-control" onClick={this.pullContent}>{this.state.title ? '修改' : '提交'}</a></p>
            </div>)

    }
});
export default Message;
import $ from 'jquery';
import React from 'react';
const Message = React.createClass({
    getInitialState: function(){
        return {
            status: true,
            value:''
        }
    },
    updateState: function(){
        this.setState({
            status: true,
            value: ''
        });
    },
    handleChange: function(e){
        this.setState({value: e.target.value});
    },
    pullIn: function(){
        let self = this;
        let text = this.state.value;
        if(!text.length){
            alert('请输入内容');
            return;
        }
        this.setState({
            status: false
        });
        $.ajax({
            type: "post",
            url: "message/message",
            data: {
                message: text
            },
            success: function(msg){
                self.updateState();
                alert("提交成功");
            },
            error: function(msg){
                self.updateState();
                alert("提交失败");
            }
        });
    },
    render: function() {
        let {status, value} = this.state;
        return (
            <div>
                <p><textarea value={value} onChange={this.handleChange}/></p>
                <p><button  onClick={this.pullIn} disabled={status ? '' : 'disabled'}>{status ? '提交' : '提交中...'}</button></p>
            </div>
        )
    }
});
export default Message;
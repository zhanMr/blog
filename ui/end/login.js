import $ from 'jquery';
import ReactDom  from 'react-dom';
import React from 'react';
const Login = React.createClass({
    getInitialState: function(){
        return {
            status: true,
            text: '',
            password: ''
        }
    },
    updateState: function(){
        this.setState({
            status: true,
            text: '',
            password: ''
        });
    },
    handleChange: function(e){
        this.setState({
            [e.target.type]: e.target.value
        });
    },
    pullIn: function(){
        let self = this;
        let {status, text, password} = self.state;
        self.setState({
            status: false
        });
        $.ajax({
            type: 'post',
            url: '/myblog/login',
            data: {
                username: text,
                password: password
            },
            success: function(msg){
                self.updateState();
                if(msg.success){
                    location.href = '/myblog/index';
                }else{
                    alert('用户名或密码错误');
                }
            },
            error: function(msg){
                alert('网络错误，请重试');
                self.updateState();
            }
        });
    },
    render: function() {
        let {status, text, password} = this.state;
        return (
            <div>
                <p><input type="text" value={text} onChange={this.handleChange}/></p>
                <p><input type="password" value={password} onChange={this.handleChange}/></p>
                <p><button onClick={this.pullIn} disabled={status ? '' : 'disabled'}>{status ? '提交' : '提交中...'}</button></p>
            </div>
        )
    }
});
export default Login;
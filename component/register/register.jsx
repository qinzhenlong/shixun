import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';
import "./register.less"

import Common from "../common.jsx";

import {url,dlog} from "../util.js";

export default class Register extends Component{
    render(){
        return (<div className="c-register">
            {/* <Common ref="common"/> */}
            <div className="detail-list">
                <form className="c-register" ref = "c-form">
                    <div className="input-box">
                        <label>姓名：</label>
                        <div>
                            <input className="name" ref="name" type="text" name="name" defaultValue = ""/>
                        </div> 
                    </div>
                    <div className="input-box">
                        <label>性别：</label>
                        <div className="sex-radio">
                            <input className="get" type="radio" name="sex" value="1" defaultChecked/>&nbsp;&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" name="sex" value="2"/>&nbsp;&nbsp;女
                        </div>
                    </div>
                    <div className="input-box">
                        <label>单位：</label>
                        <div>
                            <input className="company" ref="company" type="text" name="company" defaultValue = ""/>
                        </div> 
                    </div>
                    <div className="input-box">
                        <label>手机号：</label>
                        <div>
                            <input className="mobile" ref="mobile" type="text" name="mobile" defaultValue = ""/>
                        </div> 
                    </div>
                    <div className="input-box yanzhengma">
                        <label>验证码：</label>
                        <div>
                            <input className="yanzhengma" ref="yanzhengma" type="text" name="yanzhengma" defaultValue = ""/>
                            <p className="getphonecode" onClick={this.getCode}>获取验证码</p>
                        </div> 
                    </div>
                    <button onClick={this.check} className="register btn default-btn promise">注册</button>
                </form>
                {/* <button onClick={this.test}>注册</button> */}  
            </div>
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {
            detailList:[1,2],
            ifGetCode:false
        }
    }

    componentDidMount(){
        console.log($);
        $(".c-common-head-index").show();
    }
    check = (e)=>{
        e.preventDefault();
        if(!this.refs.name.value||!this.refs.company.value||!this.refs.mobile.value||!this.refs.yanzhengma.value){
            dlog("填写信息不完整");
            return false;
        }
        var openId = window.location.search?window.location.search.split("openId=")[1].split("&")[0]:"";
        //console.log(openId);
        var submitDate = {
            "verificationCode": this.refs.yanzhengma.value,
            "phoneNumber": this.refs.mobile.value,
            "sex": $("input[name='sex']:checked").val(),
            "company": this.refs.company.value,
            "name": this.refs.name.value,
            "openId": openId
        };
        console.log(submitDate);
        //return false;
        $.ajax({
            url:url+"api/student/Register",
            type:"post",
            data:submitDate,
            success:function(result){
                //console.log(window.location);
                if(result.status == "001"){
                    if(result.content.status==1){
                        //location.replace("#/baseOverview");
                        window.location.href = window.location.origin;
                    }else{
                        dlog(result.content.message);
                    }
                }else{
                    dlog(result.message);
                }
            }
        });
        
    }

    getCode = (e)=>{ 
        var thishtml = e.target;
        //var clickFlag = true;
        if(thishtml.innerHTML == "获取验证码"&&this.refs.mobile.value){
            var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
            thishtml.innerHTML = "发送中...";
            $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization",accesskey);
                },
                url:url+`api/sms/VerificationCode/${this.refs.mobile.value}`,
                type:"post",
                success:(result)=>{
                    //console.log(result);
                    if(result.status == "001"){
                        if(result.content.status==1){
                            dlog("发送成功");
                            var daojishi = 59;
                            thishtml.innerHTML = "60s";
                            var timer = setInterval(function(){
                                if(daojishi>0){
                                    thishtml.innerHTML = daojishi+"s";
                                    daojishi--
                                }else{
                                    //alert("时间到了")
                                    thishtml.innerHTML = "获取验证码";
                                    clearInterval(timer);
                                }
                            },1000);
                        }
                    }else{
                        dlog("系统错误");
                    } 
                }
            });
        }else{
            if(thishtml.innerHTML == "获取验证码"){
                dlog("号码不能为空");
            }
            //return false; 
        }  
    }
}
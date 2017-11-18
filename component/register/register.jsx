import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';
import "./register.less"

import Common from "../common.jsx";

export default class Register extends Component{
    render(){
        return (<div className="c-register">
            <Common ref="common"/>
            <div className="detail-list">
                <form className="c-register" ref = "c-form">
                    <div className="input-box">
                        <label>姓名：</label>
                        <input className="name" type="text" name="name" defaultValue = ""/>
                    </div>
                    <div className="input-box">
                        <label>性别：</label>
                        <input type="radio" name="sex" value="1"/>&nbsp;男&nbsp;&nbsp;
                        <input type="radio" name="sex" value="0"/>&nbsp;女
                    </div>
                    <div className="input-box">
                        <label>单位：</label>
                        <input className="name" type="text" name="name" defaultValue = ""/>
                    </div>
                    <div className="input-box">
                        <label>手机号：</label>
                        <input className="mobile" type="text" name="mobile" defaultValue = ""/>
                    </div>
                    <button onClick={this.check} className="btn default-btn promise">注册</button>
                </form>
                {/* <button onClick={this.test}>注册</button> */}  
            </div>
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {
            detailList:[1,2]
        }
    }

    componentDidMount(){
        console.log($);
    }
    check = (e)=>{
        e.preventDefault();
        //window.localStorage.loginname = "asdas";
        //window.location.href=window.location.origin+"#/baseOverview";
        var submitDate = {
            "verificationCode": "123456",
            "phoneNumber": "string",
            "sex": 0,
            "company": "string",
            "name": "string",
            "openId": "string"
        };
        $.ajax({
            
            url:"http://combatingillegaltrainingweb20171117120433.chinacloudsites.cn/api/student/Register"+window.location.search,
            type:"post",
            data:submitDate,
            success:function(result){
                console.log(window.location);
            }
        });
        
    }
}
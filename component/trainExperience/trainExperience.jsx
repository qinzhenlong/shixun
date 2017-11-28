import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx";
import "./trainExperience.less";


import {url,dlog} from "../util.js";

export default class TrainExperience extends Component{
    render(){
        var html = "";
        if(this.state.ifisshow){
            html = <li><NavLink activeClassName="active" exact to="/baoming">报名</NavLink></li>;
        }
        return (<div className="c-TrainExperience">
            <div className="c-common-head">
                <div className="c-banner">
                    <img style={{height:"100%",width:"100%",display:"block"}} src="assets/images/index.png" alt=""/>
                </div>
                <div className="hiddle-scroll">
                    <div className="scroll-right" ref="rightTick"></div>
                    <div className="nav-box">
                        <ul className="c-nav clearfix" style={{width:this.state.width}}>
                            <li><NavLink activeClassName="active" exact to="/trainingManagement">每日考勤</NavLink></li>
                            <li><NavLink activeClassName="active" exact to="/traingraderesult">成绩查询</NavLink></li>
                            <li><NavLink activeClassName="active" exact to="/trainExperience">学习心得</NavLink></li>
                            {html}
                            <li><NavLink activeClassName="active" exact to="/">返回首页</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="textarea-box clearfix">
                <textarea ref="content" name="content"></textarea>
                <button className="default-btn promise" style={{"marginTop":"10px","margin":"10px auto","display":"block"}} onClick={this.submitExperience}>提交</button>
            </div>
        </div>)
    }
    constructor(prop){
        super(prop);
        this.state = {
            width:"1250px",
            ifisshow:true
        }
    }

    componentDidMount(){
        $(".c-common-head-index").hide();
        var isApply = window.location.search?window.location.search.split("isApply=")[1].split("&")[0]:"";
        console.log(isApply)
        if(isApply == "false"||isApply == "False"){
            
        }else{
            this.setState({
                width:"1000px",
                ifisshow:false
            });
        };
    }

    submitExperience = ()=>{
        var textareaHtml = this.refs.content.value;
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        
        if(!textareaHtml){
            dlog("心得不能为空");
            return false;
        }
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
           },
            url:url+`api/StudentExperience/AddOrModify`,
            type:"post",
            data:{content:textareaHtml},
            success:(result)=>{
                if(result.status == "001"){
                    if(result.content.status==1){
                        dlog("提交成功");
                    }else{
                        dlog(result.content.message);
                    }
                }else{
                    dlog(result.content);
                }
            }
        });
        
    }

}
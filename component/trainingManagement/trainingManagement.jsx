import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx"

import {url,sha1,encodeUTF8,dlog} from "../util.js";
import "../sha.js";


export default class TrainingManagement extends Component{
    render(){
        var html = "";
        if(this.state.ifisshow){
            html = <li><NavLink activeClassName="active" exact to="/baoming">报名</NavLink></li>;
        }
        return (<div className="c-trainingManagement">
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
                <div className="content">
                    <button id="trainingManagement-btn" className="default-btn promise">点击签到</button>
                </div>
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
        console.log(this);
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        var isApply = window.location.search?window.location.search.split("isApply=")[1].split("&")[0]:"";
        if(isApply == "false"||isApply == "False"){
            
        }else{
            this.setState({
                width:"1000px",
                ifisshow:false
            });
        };
        console.log(isApply);
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
           },
            url:url+`api/student/WechatApiTicket`,
            type:"post",
            success:(result)=>{
                if(result.status == "001"){
                    if(result.content.status==1){
                        var thistimestamp = 1511099660;
                        var thisnonceStr = "ahsyth56r7thy8t6";
                        var thisticket = result.content.model;
                        var thisUrl = location.href.split('#')[0];
                        //console.log(window.location);
                        var md5sha = `jsapi_ticket=${thisticket}&noncestr=${thisnonceStr}&timestamp=${thistimestamp}&url=${thisUrl}`;
                        //var md5sha = "jsapi_ticket=bxLdikRXVbTPdHSM05e5uzuNldDzAWh8vom4IofrepT5Dxq0YRUgTBZ3GJQ343KA5_FFumMvZPwy5ubr-OsPjA&noncestr=ahsyth56r7thy8t6&timestamp=1511099660&url=http://localhost:3100?isRegister=true&isApply=False&openId=oN5XHjqdjDbDLBOLKoLdVRzUwiLc&accessToken=Gc6ELUJoUUXL4Seb735E5Gn32YgbCuSj07+A3e9lG6Ebagj75g0T2LtKm3sTQZwwp71QZJ/Uy+vMXZOnK2KrvoNYHJ4EGqPDMmZaXnzbjIw8xHruugaQhGkomIltfJxDZly0N96N9LLgjNfR7dH12Q=="
                        console.log(md5sha);
                        console.log(sha1(md5sha));
                        //return false;
                        wx.config({
                            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            //debug: true,
                            // 必填，公众号的唯一标识
                            appId: "wxa1ec97dfb6c38280",
                            // 必填，生成签名的时间戳
                            timestamp:thistimestamp,
                            // 必填，生成签名的随机串
                            nonceStr:thisnonceStr,
                            // 必填，签名，见附录1
                            signature:sha1(md5sha),
                            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            jsApiList:['scanQRCode' ]
                        });
                    }
                }
            }
        });

        wx.error(function(res) {
        });
        wx.ready(function(){
            wx.checkJsApi({
                jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });
            $("#trainingManagement-btn").on("click",function(){
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        $.ajax({
                            beforeSend: function(request) {
                                request.setRequestHeader("Authorization",accesskey);
                            },
                            url:url+`api/student/Signin?code=${res.resultStr}`,
                            type:"post",
                            success:(result)=>{
                                if(result.status == "001"){
                                    if(result.content.status==1){
                                        dlog("签到成功");
                                    }else{
                                        dlog(result.content.message);
                                    }
                                }else{
                                    dlog(result.content);
                                }
                            }
                        });
                    }
                });
            });
            
        });
    }

    dailyChick = ()=>{        
    }

}
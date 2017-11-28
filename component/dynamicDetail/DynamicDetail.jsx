import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx";
import Form,{TextBox} from "../form/Form.jsx";

import {url} from "../util.js"


export default class DynamicDetail extends Component{
    render(){
        let detailHtml = [];
        this.state.detailList.forEach((value,index)=>{
            detailHtml.push(<li className="list" key={index}>
                <a href={value.link}>
                    <div className="title">{value.tittle}</div>
                        <div className="contain clearfix">
                            <div className="photo f-left"><img src={value.pictureUrl}/></div>
                            <div className="text-contain f-left">{value.content&&value.content.length>55?value.content.substring(0,55)+"...":value.content}</div>
                        </div>
                    <div className="contain-foot">{value.createtime.split("T")[0]+" "+value.createtime.split("T")[1].substring(0,5)}</div>
                </a>               
            </li>);
        });
        return (<div className="c-dynamic-detail">
            {/* <Common ref="common"/> */}
            <div className="detail-list">
                <div className="search-box clearfix">
                    <input type="text" ref="check" defaultValue="" />
                    <button onClick = {this.check}>查找</button>
                </div>
                <ul className="ul-box">
                    {detailHtml}
                </ul>
                <div className="loadMore" ref="load"></div>
            </div> 
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {
            detailList:[]
        }
    }

    componentDidMount(){
        var indexPage = 1;
        var ifScroll = true;
        $(".c-common-head-index").show();
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
           },
            url:url+`api/DynamicInformation/${1}/${10}`,
            type:"post",
            success:(result)=>{
                //console.log(window.location.search.split("accessToken=")[1]);
                if(result.status == "001"){
                    if(result.content.status==1){
                        console.log(this);
                        this.setState({
                            detailList:result.content.model.entities
                        });
                    }
                }
            }
        });

        window.onscroll = ()=>{
            if($(document).height()-($(window).scrollTop() + $(window).height())<5){
                //alert("到底了");
                if(ifScroll){
                    this.refs.load.innerHTML = "正在加载中...";
                    indexPage++;
                    ifScroll = false;
                    $.ajax({
                        beforeSend: function(request) {
                            request.setRequestHeader("Authorization",accesskey);
                       },
                        url:url+`api/DynamicInformation/${indexPage}/${10}`,
                        type:"post",
                        success:(result)=>{
                            //console.log(window.location.search.split("accessToken=")[1]);
                            if(result.status == "001"){
                                if(result.content.status==1){
                                    if(result.content.model.entities.length){
                                        console.log(this);
                                        var newList = [...this.state.detailList,...result.content.model.entities];
                                        this.setState({
                                            detailList:newList
                                        });
                                        this.refs.load.innerHTML = "";
                                        ifScroll = true;
                                    }else{
                                        this.refs.load.innerHTML = "没有更多数据";
                                    }
                                }
                            }
                        }
                    });
                } 
            }
        }
    }
    //搜索入口
    check = ()=>{
        console.log(this.refs.check.value);
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        var keyword = this.refs.check.value;
        var cururl;
        if(this.refs.check.value){
            cururl = url+`api/DynamicInformation/${1}/${10}/${keyword}`;
        }else{
            cururl = url+`api/DynamicInformation/${1}/${10}`;
        }

        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
        },
            url:cururl,
            type:"post",
            success:(result)=>{
                if(result.status == "001"){
                    if(result.content.status==1){
                        console.log(this);
                        this.setState({
                            detailList:result.content.model.entities
                        });
                    }
                }
            }
        });
    }

}
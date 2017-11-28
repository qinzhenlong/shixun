import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import "./StudentMien.less";

import Common from "../common.jsx"

import {url} from "../util.js"


export default class StudentMien extends Component{
    render(){
        
        return (<div className="c-studentMien">
            {/* <Common ref="common"/> */}
            <div className="studentMien-detail">
                {this.state.studentList.map((value,index)=>{
                    return <div className="banner-list" key = {index} onClick={()=>{this.todetail(value)}}>
                        <img src={value.pictureUrl} alt=""/>
                        <div className="name list clearfix">
                            <label>姓名：</label>
                            <div>{value.studentName}</div>
                        </div>
                        <div className="company list clearfix">
                            <label>单位：</label>
                            <div>{value.company}</div>
                        </div>
                        <div className="qishu list clearfix">
                            <label>期数：</label>
                            <div>{value.season}</div>
                        </div>
                        <div className="Comment list clearfix">
                            <label>心得：</label>
                            <div>{value.experience}</div>
                        </div>
                    </div>
                })}
                <div className="loadMore" ref="load"></div>
            </div>
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {
            studentList:[]
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
            url:url+`api/OutstandingTrainning/WechatPaging/${1}/${10}`,
            type:"post",
            success:(result)=>{
                if(result.status == "001"){
                    if(result.content.status==1){
                        console.log(this);
                        this.setState({
                            studentList:result.content.model.entities
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
                    console.log(this);
                    indexPage++;
                    ifScroll = false;
                    $.ajax({
                        beforeSend: function(request) {
                            request.setRequestHeader("Authorization",accesskey);
                       },
                        url:url+`api/OutstandingTrainning/${indexPage}/${10}`,
                        type:"post",
                        success:(result)=>{
                            //console.log(window.location.search.split("accessToken=")[1]);
                            if(result.status == "001"){
                                if(result.content.status==1){
                                    if(result.content.model.entities.length){
                                        console.log(this);
                                        var newList = [...this.state.studentList,...result.content.model.entities];
                                        this.setState({
                                            studentList:newList
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

    todetail = (value)=>{
        //console.log(value);
        this.props.history.push("#/mienDetail/"+value.id);
        location.replace("#/mienDetail/"+value.id);
    }

}
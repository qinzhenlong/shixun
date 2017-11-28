import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';
import { browserHistory } from 'react-router'
import "./trainingTidbits.less"

import Common from "../common.jsx"

import {url} from "../util.js"


export default class TrainingTidbits extends Component{
    render(){
        let detailHtml = [];
        this.state.detailList.forEach((value,index)=>{
            if(value.pictureUrl){
                detailHtml.push(<li className="list" key={index}   onClick={()=>this.detail(value)}>
                    {/* <div className="title"><div>23</div>加菲猫</div> */}
                    <div className="contain clearfix">
                        <div className="photo f-left"><img src={value.pictureUrl} alt=""/></div>
                        <div className="text-contain f-left">{value.content&&value.content.length>55?value.content.substring(0,55)+"...":value.content}</div>
                    </div>
                    <div className="contain-foot">{value.createTime.split("T")[0]+" "+value.createTime.split("T")[1].substring(0,5)}</div>
                </li>);
            }
        });
        return (<div className="c-TrainingTidbits">
            {/* <Common ref="common"/> */}
            <div className="detail-list">
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
            url:url+`api/TrainningHighlight/${1}/${10}`,
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
                        url:url+`api/TrainningHighlight/${indexPage}/${10}`,
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

    detail = (value)=>{
        this.props.history.push("#/trainDetail/"+value.id);
        location.replace("#/trainDetail/"+value.id);
        //this.props.history.replace("#/trainDetail/"+value.id);
        
    }

}
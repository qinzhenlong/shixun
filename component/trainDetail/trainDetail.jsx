import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import {url} from "../util.js";
import "./trainDetail.less";

import Common from "../common.jsx";

export default class TrainDetail extends Component{
    render(){
        return (<div className="c-trainDetail">
            {this.state.detailList.map((value,index)=>{
                return <div className="content-box" key={index}>
                <img className="detailImg" src={value.pictureUrl} alt=""/>
                <div className="content">
                    {value.content}
                </div>
            </div> 
            })}
               
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {
            detailList:[]
        }
    }

    componentDidMount(){
        var idArr = window.location.hash.split("/");
        var id = idArr[idArr.length-1];
        //console.log(idArr[idArr.length-1]);
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        $(".c-common-head-index").hide();
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
           },
            url:url+`api/TrainningHighlightItem/TrainningHighlight/${id}`,

            type:"get",
            success:(result)=>{
                //console.log(window.location.search.split("accessToken=")[1]);
                if(result.status == "001"){
                    if(result.content.status==1){
                        console.log(this);
                        this.setState({
                            detailList:result.content.model
                        });
                        if(result.content.model.length==0){
                            $(".c-trainDetail").html("<div style='text-align:center;font-size:50px;margin-top:30px;'>暂无数据</div>");
                        }
                        console.log(this);
                    }
                }
            }
        });
    }
    check = (e)=>{
       
        
    }

    getCode = (e)=>{ 

    }
}
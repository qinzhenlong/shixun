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
                    <div className="title"><div>{index+1}</div>{value.tittle}</div>
                        <div className="contain clearfix">
                            <div className="photo f-left"><img src={value.pictureUrl}/></div>
                            <div className="text-contain f-left">{value.content}</div>
                        </div>
                    <div className="contain-foot">{value.createtime}</div>
                </a>               
            </li>);
        });
        return (<div className="c-dynamic-detail">
            <Common ref="common"/>
            <div className="detail-list">
                <div className="search-box clearfix">
                    <input type="text" ref="check" defaultValue="" />
                    <button onClick = {this.check}>查看</button>
                </div>
                <ul className="ul-box">
                    {detailHtml}
                </ul>
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
        console.log(url);
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
           },
            url:url+`/api/DynamicInformation/${1}/${10}`,
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
    }
    //搜索入口
    check = ()=>{
        alert(this.refs.check.value);
    }

}
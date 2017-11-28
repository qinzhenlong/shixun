import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx";

import "./traingraderesult.less";

import {url,dlog} from "../util.js";

export default class Traingraderesult extends Component{
    render(){
        var html = "";
        if(this.state.ifisshow){
            html = <li><NavLink activeClassName="active" exact to="/baoming">报名</NavLink></li>;
        }
        return (<div className="c-GradeQuery">
            <div className="c-common-head">
                <div className="c-banner">
                    <img style={{height:"100%",width:"100%",display:"block"}} src="assets/images/index.png" alt=""/>
                </div>
                <div className="hiddle-scroll">
                    <div className="scroll-right" ref="rightTick"></div>
                    <div className="nav-box">
                        <ul className="c-nav clearfix" style={{width:this.state.width}}>
                            {/* <li onClick={this.dailyChick}>每日考勤</li> */}
                            <li><NavLink activeClassName="active" exact to="/trainingManagement">每日考勤</NavLink></li>
                            <li><NavLink activeClassName="active" exact to="/traingraderesult">成绩查询</NavLink></li>
                            <li><NavLink activeClassName="active" exact to="/trainExperience">学习心得</NavLink></li>
                            {html}
                            <li><NavLink activeClassName="active" exact to="/">返回首页</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="table-box" ref="gradeResult">
                <table className={this.state.ifshow?"":"hide"} cellSpacing="0" cellPadding="10">
                    <tbody>
                        <tr>
                            <td width="50%">考勤</td>
                            <td>{this.state.result.AttendanceScore}</td>
                        </tr>
                        <tr>
                            <td>纪律</td>
                            <td>{this.state.result.DisciplineScore}</td> 
                        </tr>
                        <tr>
                            <td>理论</td>
                            <td>{this.state.result.TheoryScore}</td>
                        </tr>
                        <tr>
                            <td>模拟</td>
                            <td>{this.state.result.SimulationScore}</td>
                        </tr>
                        <tr>
                            <td>实战</td>
                            <td>{this.state.result.ActualPerformanceScore}</td>
                        </tr>
                        <tr>
                            <td>总分</td>
                            <td>{this.state.result.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>)
    }
    constructor(prop){
        super(prop);
        this.state = {
            result:{
                AttendanceScore:"a",
                DisciplineScore:"b",
                TheoryScore:"c",
                SimulationScore:"d",
                ActualPerformanceScore:"e",
                total:"f"
            },
            ifshow:false,
            width:"1250px",
            ifisshow:true
        }
    }

    check = (e)=>{
        e.preventDefault();
        
    }

    componentDidMount(){
        $(".c-common-head-index").hide();
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        var isApply = window.location.search?window.location.search.split("isApply=")[1].split("&")[0]:"";
        if(isApply == "false"||isApply == "False"){
            
        }else{
            this.setState({
                width:"1000px",
                ifisshow:false
            });
        };
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
           },
            url:url+`api/student/Scores`,
            type:"post",
            success:(result)=>{
                if(result.status == "001"){
                    if(result.content.status==1){
                        this.setState({
                            result:{
                                AttendanceScore:result.content.model.attendanceScore,
                                DisciplineScore:result.content.model.disciplineScore,
                                TheoryScore:result.content.model.theoryScore,
                                SimulationScore:result.content.model.simulationScore,
                                ActualPerformanceScore:result.content.model.actualPerformanceScore,
                                total:result.content.model.totalScore
                            },
                            ifshow:true
                        });
                    }else{
                        this.setState({
                            ifshow:true
                        });
                        //ifshow:true
                        this.refs.gradeResult.innerHTML="<div class='noneData'>查询无结果</div>";
                    }
                }else{
                    this.refs.gradeResult.innerHTML=`<div class='noneData'>${result.content}</div>`;
                }
                //console.log(this);
            }
        });
    }

}
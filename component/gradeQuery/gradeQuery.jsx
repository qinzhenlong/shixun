import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';
import "./GradeQuery.less";
import "./graderesult.less";

import Common from "../common.jsx";

import {url,dlog} from "../util.js";

export default class GradeQuery extends Component{
    render(){
        return (<div className="c-GradeQuery">
            {/* <Common ref="common"/> */}
            <form className={this.state.ifshow?"c-form":"c-form hide"} ref = "c-form">
                <div className="input-box">
                    {/* <label>姓名：</label> */}
                    <input ref="name" placeholder="姓名" className="name" type="text" name="name" defaultValue = ""/>
                </div>
                <div className="input-box">
                    {/* <label>手机号：</label> */}
                    <input ref="mobile" placeholder="手机号" className="mobile" type="text" name="mobile" defaultValue = ""/>
                </div>
                <button onClick={this.check} className="btn default-btn promise">查看</button>
            </form>
            <div className={this.state.ifshow?"c-GradeQuery hide":"c-GradeQuery"} ref="GradeQuery">
                <div className="table-box">
                    <table cellSpacing="0" cellPadding="10">
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
            </div>
        </div>)
    }
    constructor(prop){
        super(prop);
        this.state = {
            ifshow:true,
            result:{
                AttendanceScore:"",
                DisciplineScore:"",
                TheoryScore:"",
                SimulationScore:"",
                ActualPerformanceScore:"",
                total:""
            }
        }
    }

    check = (e)=>{
        e.preventDefault();
        console.log(this.refs.name.value);
        console.log(this.refs.mobile.value);
        //window.location.href=window.location.origin+"#/graderesult";
        if(this.refs.name.value&&this.refs.mobile.value){
            
            var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
            var studentValue = window.location.hash.split("/");
            console.log(window.location.hash.split("/"));
            $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization",accesskey);
               },
                //url:url+`api/StudentScore/18815288459/dsj`,
                url:url+`api/StudentScore/${this.refs.mobile.value}/${this.refs.name.value}`,
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
                                }
                            });
                        }else{
                            this.refs.GradeQuery.innerHTML="<div class='noneData'>查询无结果<div>";
                        }
                    }else{
                        this.refs.GradeQuery.innerHTML="<div class='noneData'>查询无结果<div>";
                    }
                    this.setState({
                        ifshow:false
                    });
                }
            });
            //location.replace(`#/graderesult/${this.refs.mobile.value}/${this.refs.name.value}`);
        }else{
            
            dlog("姓名和电话不能为空");
        }
    }

    componentDidMount(){
        $(".c-common-head-index").show();
    }

}
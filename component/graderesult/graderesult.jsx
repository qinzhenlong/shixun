import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx";

import "./graderesult.less";

import {url} from "../util.js";

export default class Graderesult extends Component{
    render(){
        return (<div className="c-GradeQuery">
            <div className="table-box">
                <table cellSpacing="0" cellPadding="10">
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
                </table>
            </div>
            
        </div>)
    }
    constructor(prop){
        super(prop);
        this.state = {
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
        
    }

    componentDidMount(){
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        var studentValue = window.location.hash.split("/");
        console.log(window.location.hash.split("/"));
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
           },
            //url:url+`api/StudentScore/18815288459/dsj`,
            url:url+`api/StudentScore/${studentValue[studentValue.length-2]}/${studentValue[studentValue.length-1]}`,
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
                    }
                }
                //console.log(this);
            }
        });
    }

}
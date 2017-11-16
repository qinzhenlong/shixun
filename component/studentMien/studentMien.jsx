import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import "./StudentMien.less";

import Common from "../common.jsx"


export default class StudentMien extends Component{
    render(){
        
        return (<div className="c-studentMien">
            <Common/>
            <div className="studentMien-detail">
                {this.state.studentList.map((value,index)=>{
                    return <div className="banner-list" key = {index}>
                        <img src="../../assets/images/test.png" alt=""/>
                        <div className="name list">
                            <label>姓名：</label>
                            <div>张三</div>
                        </div>
                        <div className="company list">
                            <label>单位：</label>
                            <div>xxxx公司</div>
                        </div>
                        <div className="qishu list">
                            <label>期数：</label>
                            <div>12期</div>
                        </div>
                        <div className="Experience list">
                            <label>心得：</label>
                            <div>xx撒打算打算打算打算撒打算打算打算打算的撒打算打算打算打算的撒打算打算打算打算的撒打算打算打算打算的的</div>
                        </div>
                        <div className="Comment list">
                            <label>评语：</label>
                            <div>算打算撒打算打算打算打算的撒打算打算打算打算的撒打算</div>
                        </div>
                    </div>
                })}
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
        //alert("学院风采");
        this.setState({
            studentList:[1,2]
        });
    }

}
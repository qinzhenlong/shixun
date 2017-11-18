import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';
import "./GradeQuery.less"

import Common from "../common.jsx";

export default class GradeQuery extends Component{
    render(){
        return (<div className="c-GradeQuery">
            <Common ref="common"/>
            <form className="c-form" ref = "c-form">
                <div className="input-box">
                    <label>姓名：</label>
                    <input className="name" type="text" name="name" defaultValue = ""/>
                </div>
                <div className="input-box">
                    <label>手机号：</label>
                    <input className="mobile" type="text" name="mobile" defaultValue = ""/>
                </div>
                <button onClick={this.check} className="btn default-btn promise">查看</button>
            </form>
        </div>)
    }
    constructor(prop){
        super(prop);
        this.state = {

        }
    }

    check = (e)=>{
        e.preventDefault();
        window.location.href=window.location.origin+"#/graderesult";
    }

    componentDidMount(){
        
    }

}
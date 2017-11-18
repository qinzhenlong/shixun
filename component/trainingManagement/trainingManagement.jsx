import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx"


export default class TrainingManagement extends Component{
    render(){
        return (<div className="c-trainingManagement">
            <Common ref="common"/>
            实训管理
            <button onClick={this.loginout}>注销</button>
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {

        }
    }

    componentDidMount(){

    }

    loginout = ()=>{ 
        window.localStorage.clear();
        window.location.href=window.location.origin+"#/baseOverview";
    }

}
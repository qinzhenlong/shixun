import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx";

export default class Graderesult extends Component{
    render(){
        return (<div className="c-GradeQuery">
            <div>成绩查询</div>
        </div>)
    }
    constructor(prop){
        super(prop);
        this.state = {

        }
    }

    check = (e)=>{
        e.preventDefault();
        
    }

    componentDidMount(){
        
    }

}
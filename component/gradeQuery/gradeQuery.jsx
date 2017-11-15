import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx"


export default class GradeQuery extends Component{
    render(){
        return (<div className="c-GradeQuery">
            <Common/>
            成绩查询
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {

        }
    }

    componentDidMount(){

    }

}
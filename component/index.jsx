import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "./common.jsx"
export default class Index extends Component{
    render(){
        return (<div className="index-page" ref="aaa">
            <Common/>
        </div>)
    }
    constructor(prop){
        super(prop);
        this.state = {

        }
    }

}
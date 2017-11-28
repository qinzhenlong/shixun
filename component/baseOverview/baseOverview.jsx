import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx";
import "./baseOverview.less";


export default class BaseOverview extends Component{
    render(){
        return (<div className="c-baseOverview">
            {/* <Common ref="common"/> */}
            <div className="img-box">
                <img src="assets/images/index/head.png"/>
                <img src="assets/images/index/banner1.png"/>
                <img src="assets/images/index/banner2.png"/>
                <img src="assets/images/index/banner3.png"/>
                <img src="assets/images/index/banner4.png"/>
            </div>
            
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {

        }
    }

    componentDidMount(){
        $(".c-common-head-index").show();
    }

}
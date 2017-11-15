import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';


export default class Common extends Component{
    render(){
        return (<div className="c-common-head">
            <div className="c-banner"></div>
            <ul className="c-nav clearfix">
                <li><NavLink activeClassName="active" exact to="/dynamicDetail">动态信息</NavLink></li>
                <li><NavLink activeClassName="active" exact to="/aa">实训花絮</NavLink></li>
                <li><NavLink activeClassName="active" exact to="/bb">学员风采</NavLink></li>
                <li><NavLink activeClassName="active" exact to="/cc">成绩查询</NavLink></li>
                <li><NavLink activeClassName="active" exact to="/dd">基地概况</NavLink></li>
                {this.state.flag?<li><NavLink activeClassName="active" exact to="/ee">实训管理</NavLink></li>:<li><NavLink activeClassName="active" exact to="/ee">注册</NavLink></li>}
            </ul>
        </div>)
    }
    constructor(prop){
        super(prop);
        this.state = {
            flag:true,
        }
    }

}
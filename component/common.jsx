import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';


export default class Common extends Component{
    render(){
        return (<div className="c-common-head c-common-head-index">
            <div className="c-banner">
                <img style={{height:"100%",width:"100%",display:"block"}} src="assets/images/index.png" alt=""/>
            </div>
            <div className="hiddle-scroll">
                <div className="scroll-right" ref="rightTick"></div>
                {/* <div className="scroll-left">{"<"}</div> */}
                <div className="nav-box" ref="scroll">
                    
                    <ul className="c-nav clearfix">
                        {/* <li><NavLink activeClassName="active" exact to="/dynamicDetail">动态信息</NavLink></li> */}
                        <li><NavLink activeClassName="active" exact to="/">动态信息</NavLink></li>
                        <li><NavLink activeClassName="active" exact to="/trainingTidbits">实训花絮</NavLink></li>
                        <li><NavLink activeClassName="active" exact to="/studentMien">学员风采</NavLink></li>
                        <li><NavLink activeClassName="active" exact to="/baseOverview">基地概况</NavLink></li>
                        <li><NavLink activeClassName="active" exact to="/gradeQuery">成绩查询</NavLink></li>
                        {this.state.flag?<li><NavLink activeClassName="active" exact to="/trainingManagement">实训管理</NavLink></li>:<li><NavLink activeClassName="active" exact to="/register">注册</NavLink></li>}
                    </ul>
                </div>
            </div>
        </div>)
    }
    constructor(prop){
        super(prop);
        //console.log(this.props);
        this.state = {
            
        }
        //window.localStorage.loginname = "22"
        //console.log(window.localStorage.loginname);
    }

    componentDidMount(){
        var getUserDate = {};
        window.location.search.substring(1).split("&").forEach(value=>{
            getUserDate[value.split("=")[0]] = value.split("=")[1]
        });

        //console.log(getUserDate);
        
        this.setState({
            //flag:window.localStorage.loginname == undefined?false:true
            flag:getUserDate.isRegister=="true"?true:false
        });
        
    }

}
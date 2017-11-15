import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import "../style/index.less";

import DynamicDetail from "../component/dynamicDetail/DynamicDetail.jsx";

//引入组件
import Index from "../component/index.jsx";

export default class App extends Component{
	render(){
		return (
			<HashRouter>
				<div className="c-contail">
					<div>
						<Route exact path="/dynamicDetail" component={DynamicDetail}></Route>
					</div>
				</div>
			</HashRouter>
		);
	}
	componentDidMount(){
	}

}


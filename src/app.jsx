import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import "../style/index.less";

import DynamicDetail from "../component/dynamicDetail/DynamicDetail.jsx";
import TrainingTidbits from "../component/trainingTidbits/trainingTidbits.jsx";
import StudentMien from "../component/studentMien/studentMien.jsx";
import GradeQuery from "../component/gradeQuery/gradeQuery.jsx";
import BaseOverview from "../component/baseOverview/baseOverview.jsx";
import TrainingManagement from "../component/trainingManagement/trainingManagement.jsx";


//引入组件
import Index from "../component/index.jsx";

export default class App extends Component{
	render(){
		return (
			<HashRouter>
				<div className="c-contail">
					<div>
						{/* <Route exact path="/dynamicDetail" component={DynamicDetail}></Route> */}
						<Route exact path="/" component={DynamicDetail}></Route>
						<Route exact path="/trainingTidbits" component={TrainingTidbits}></Route>
						<Route exact path="/studentMien" component={StudentMien}></Route>
						<Route exact path="/gradeQuery" component={GradeQuery}></Route>
						<Route exact path="/baseOverview" component={BaseOverview}></Route>
						<Route exact path="/trainingManagement" component={TrainingManagement}></Route>
					</div>
				</div>
			</HashRouter>
		);
	}
	componentDidMount(){
	}

}


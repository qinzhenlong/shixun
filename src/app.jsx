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
import Register from "../component/register/register.jsx";


//成绩查询
import Graderesult from "../component/graderesult/graderesult.jsx";
import Traingraderesult from "../component/traingraderesult/traingraderesult.jsx";

//花絮详情
import TrainDetail from "../component/trainDetail/trainDetail.jsx";

//实训心得
import TrainExperience from "../component/trainExperience/trainExperience.jsx";
//学员风采详情
import MienDetail from "../component/mienDetail/mienDetail.jsx";

//报名
import Baoming from "../component/baoming/baoming.jsx";


//引入组件
import Common from "../component/common.jsx";

export default class App extends Component{
	render(){
		return (
			<HashRouter history={hashHistory}>
				<div className="c-contail">
					<Common/>
					<div>
						{/* <Route exact path="/dynamicDetail" component={DynamicDetail}></Route> */}
						<Route exact path="/" component={DynamicDetail}></Route>
						<Route exact path="/trainingTidbits" component={TrainingTidbits}></Route>
						<Route exact path="/studentMien" component={StudentMien}></Route>
						<Route exact path="/gradeQuery" component={GradeQuery}></Route>
						<Route exact path="/baseOverview" component={BaseOverview}></Route>
						<Route exact path="/trainingManagement" component={TrainingManagement}></Route>
						<Route exact path="/register" component={Register}></Route>
						<Route path="/graderesult" component={Graderesult}></Route>
						<Route path="/trainDetail" component={TrainDetail}></Route>
						{/* 实训记录里面的成绩查询 */}
						<Route path="/traingraderesult" component={Traingraderesult}></Route>
						{/* 实训心得 */}
						<Route path="/trainExperience" component={TrainExperience}></Route>
						{/* 学员风采详情 */}
						<Route path="/mienDetail" component={MienDetail}></Route>
						{/* 报名 */}
						<Route path="/baoming" component={Baoming}></Route>
					</div>
				</div>
			</HashRouter>
		);
	}
	componentDidMount(){
	}

}


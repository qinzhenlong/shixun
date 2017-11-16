import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';
import "./trainingTidbits.less"

import Common from "../common.jsx"


export default class TrainingTidbits extends Component{
    render(){
        let detailHtml = [];
        this.state.detailList.forEach((value,index)=>{
            detailHtml.push(<li className="list" key={index}>
                <div className="title"><div>23</div>加菲猫</div>
                <div className="contain clearfix">
                    <div className="photo f-left"></div>
                    <div className="text-contain f-left">撒打算打算离开多久啊看金德拉克商界大佬世界大力士肯德基阿莱克斯多久啊来看电视剧阿里斯顿卡基地撒打算打算离开多久啊看金德拉克商界大佬世界大力士肯德基阿莱克斯多久啊来看电视剧阿里斯顿卡基地撒打算打算离开多久啊看金德拉克商界大佬世界大力士肯德基阿莱克斯多久啊来看电视剧阿里斯顿卡基地</div>
                </div>
                <div className="contain-foot">2017-11-06</div>
            </li>);
        });
        return (<div className="c-TrainingTidbits">
            <Common name="asdasd"/>
            <div className="detail-list">
                <ul className="ul-box">
                    {detailHtml}
                </ul>
            </div>
        </div>)
    }
    constructor(prop){
        
        super(prop);
        this.state = {
            detailList:[1,2]
        }
    }

    componentDidMount(){

    }

}
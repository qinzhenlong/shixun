import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';

import Common from "../common.jsx";
import Form,{TextBox} from "../form/Form.jsx";


export default class DynamicDetail extends Component{
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
        return (<div className="c-dynamic-detail">
            <Common ref="common"/>
            <div className="detail-list">
                <div className="search-box clearfix">
                    <input type="text" ref="check" defaultValue="" />
                    <button onClick = {this.check}>查看</button>
                </div>
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
        //console.log(this.refs.input.value);
        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Gc6ELUJoUUXL4Seb735E5Gn32YgbCuSj07+A3e9lG6Ebagj75g0T2LtKm3sTQZwwp71QZJ/Uy+vMXZOnK2KrvtGeXfwqOHW+4CoyXio3SiTu9LjdtITFHShCmYWMZqdvfJiOAzsfZysArsh4vzUeYA==");
           },
            url:"http://combatingillegaltrainingweb20171117120433.chinacloudsites.cn/api/student/Register",
            type:"post",
            //data:submitDate,
            success:function(result){
                console.log(window.location);
            }
        });
    }
    //搜索入口
    check = ()=>{
        alert(this.refs.check.value);
    }

}
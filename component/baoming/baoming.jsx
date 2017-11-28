import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { BrowserRouter,StaticRouter, Route,Link,hashHistory,NavLink,HashRouter } from 'react-router-dom';
import "./baoming.less"

import Common from "../common.jsx";

import {url,dlog} from "../util.js";

export default class Baoming extends Component{
    render(){
        var html = "";
        var data = new Date();
        var today = `格式：${data.getFullYear()}-${(data.getMonth()+1)>9?(data.getMonth()+1):("0"+(data.getMonth()+1))}-${data.getDay()>9?data.getDay():("0"+data.getDay())}`
        if(this.state.ifisshow){
            html = <li><NavLink activeClassName="active" exact to="/baoming">报名</NavLink></li>;
        }
        return (<div className="c-baoming">
            <div className="c-common-head">
                <div className="c-banner">
                    <img style={{height:"100%",width:"100%",display:"block"}} src="assets/images/index.png" alt=""/>
                </div>
                <div className="hiddle-scroll">
                    <div className="scroll-right" ref="rightTick"></div>
                    <div className="nav-box">
                        <ul className="c-nav clearfix" style={{width:this.state.width}}>
                            <li><NavLink activeClassName="active" exact to="/trainingManagement">每日考勤</NavLink></li>
                            <li><NavLink activeClassName="active" exact to="/traingraderesult">成绩查询</NavLink></li>
                            <li><NavLink activeClassName="active" exact to="/trainExperience">学习心得</NavLink></li>
                            {html}
                            <li><NavLink activeClassName="active" exact to="/">返回首页</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="baoming">
                <div className="input-group">
                    <label>出生年月：</label>
                    <input type="text" id="beginTime" placeholder={today} name="birthday"/>
                </div>
                <div className="input-group">
                    <label>是否取得监督员证：</label>
                    <div className="radio-box">
                        <input type="radio" name="isHasObtainSupervisorID" defaultValue={true}/>&nbsp;是&nbsp;&nbsp;
                        <input type="radio" name="isHasObtainSupervisorID" defaultValue={false}/>&nbsp;否
                    </div>
                    
                </div>
                <div className="input-group">
                    <label>是否取得执法证：</label>
                    <input type="radio" name="isHasObtainLawEnforcementCertificate" defaultValue={true}/>&nbsp;是&nbsp;&nbsp;
                    <input type="radio" name="isHasObtainLawEnforcementCertificate" defaultValue={false}/>&nbsp;否
                </div>
                <div className="input-group">
                    <label>是否具备打非经验：</label>
                    <input type="radio" name="isHasCombatingIllegalTrainingExperience" defaultValue={true}/>&nbsp;是&nbsp;&nbsp;
                    <input type="radio" name="isHasCombatingIllegalTrainingExperience" defaultValue={false}/>&nbsp;否
                </div>
                <div className="input-group">
                    <label>办案能力：</label>
                    <div className="radio-box">
                        <input type="radio" name="caseHandlingAbility" defaultValue={1}/>&nbsp;能独立办案&nbsp;&nbsp;
                        <input type="radio" name="caseHandlingAbility" defaultValue={2}/>&nbsp;能协助办案
                        <input type="radio" name="caseHandlingAbility" defaultValue={3}/>&nbsp;无
                    </div>
                </div>
                <div className="input-group">
                    <label>个性需求：</label>
                    <div className="radio-box">
                        <input type="radio" name="personalNeeds" defaultValue={1}/>&nbsp;理论基础&nbsp;&nbsp;
                        <input type="radio" name="personalNeeds" defaultValue={2}/>&nbsp;现场实践&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="personalNeeds" defaultValue={3}/>&nbsp;案例分析&nbsp;&nbsp;
                        <input type="radio" name="personalNeeds" defaultValue={4}/>&nbsp;联合夜查&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" name="personalNeeds" defaultValue={0}/>其他
                        <input className="personalNeedsExtensionsContent" type="text" name="personalNeedsExtensionsContent"/>
                    </div>
                </div>
                <div className="input-group">
                    <label>工作单位及岗位：</label>
                    <input type="text" name="companyDetail"/>
                </div>
                <div className="input-group">
                    <label>学习经历：</label>
                    {/* <input type="text" name="learningExperience"/> */}
                    <textarea name="learningExperience" id="learningExperience"></textarea>
                </div>
                <div className="input-group">
                    <label>工作简历：</label>
                    {/* <input type="text" name="resume"/> */}
                    <textarea name="resume" id="resume"></textarea>
                </div>
                <button className="update default-btn promise c-submit-btn" onClick={this.handleSubmit}>提交</button>
            </div>
        </div>);
    }

    constructor(prop){
        super(prop);
        this.state = {
            width:"1250px",
            ifisshow:true
        }
    }

    componentDidMount(){
        setTimeout(function(){
            $('#beginTime').date();
        },200);
        
        var isApply = window.location.search?window.location.search.split("isApply=")[1].split("&")[0]:"";
        console.log(isApply)
        if(isApply == "false"||isApply == "False"){
            
        }else{
            this.setState({
                width:"1000px",
                ifisshow:false
            });
        };
        console.log($('input:radio[name="isHasObtainSupervisorID"]:checked').val());
        $(".c-common-head-index").hide();
        $(".personalNeedsExtensionsContent").hide();

        $('input:radio[name="personalNeeds"]').change(()=>{
            console.log($('input:radio[name="personalNeeds"]:checked').val());
            if($('input:radio[name="personalNeeds"]:checked').val()==0){
                $(".personalNeedsExtensionsContent").show();
            }else{
                $(".personalNeedsExtensionsContent").hide();
            }
        });
    }
    handleSubmit = (e)=>{
        var accesskey = window.location.search?window.location.search.split("accessToken=")[1]:"";
        //获取表单数据
        var birthday = $('input:text[name="birthday"]').val();
        var isHasObtainSupervisorID = $('input:radio[name="isHasObtainSupervisorID"]:checked').val();
        var isHasObtainLawEnforcementCertificate = $('input:radio[name="isHasObtainLawEnforcementCertificate"]:checked').val();
        var isHasCombatingIllegalTrainingExperience = $('input:radio[name="isHasCombatingIllegalTrainingExperience"]:checked').val();
        var caseHandlingAbility = $('input:radio[name="caseHandlingAbility"]:checked').val();
        var personalNeeds = $('input:radio[name="personalNeeds"]:checked').val();
        var personalNeedsExtensionsContent = $('input:text[name="personalNeedsExtensionsContent"]').val();
        var companyDetail = $('input:text[name="companyDetail"]').val();
        var learningExperience = $('#learningExperience').val();
        var resume = $("#resume").val();

        var submitData = {};
        submitData.birthday = birthday;
        submitData.isHasObtainSupervisorID = isHasObtainSupervisorID;
        submitData.isHasObtainLawEnforcementCertificate = isHasObtainLawEnforcementCertificate;
        submitData.isHasCombatingIllegalTrainingExperience = isHasCombatingIllegalTrainingExperience;
        submitData.caseHandlingAbility = caseHandlingAbility;
        submitData.personalNeeds = personalNeeds;
        if(submitData.personalNeeds == 0){
            submitData.personalNeedsExtensionsContent = personalNeedsExtensionsContent;
        }else{
            submitData.personalNeedsExtensionsContent = "1";
        }
        
        submitData.companyDetail = companyDetail;
        submitData.learningExperience = learningExperience;
        submitData.resume = resume;
        if(submitData.personalNeeds == 0){
            for(var key in submitData){
                    if(!submitData[key]){
                        dlog("请填写完整信息");
                        return false;
                    }
            }
        }else{
            for(var key in submitData){
                if(key!="personalNeedsExtensionsContent"){
                    if(!submitData[key]){
                        dlog("请填写完整信息");
                        return false;
                    }
                }
            }
        }
        if(!/^[0-9]{4}-[0-9]{2}-[0-9]{1,2}$/.test(birthday)){
            dlog("生日格式不正确");
            return false;
        }
        

        $.ajax({
            beforeSend: function(request) {
                request.setRequestHeader("Authorization",accesskey);
           },
           contentType:"application/json",
           dataType:"json",
           xhrFields: {
                withCredentials: true
            },
            url:url+`api/student/Apply`,
            type:"post",
            data:JSON.stringify(submitData),
            success:(result)=>{
                if(result.status == "001"){
                    if(result.content.status==1){
                        $(".c-submit-btn").addClass("disable");
                        $(".c-submit-btn").attr("disabled",true);
                        dlog("报名成功");
                    }else{
                        dlog(result.content.message);
                    }
                }else{
                    dlog(result.content);
                }
            }
        });
    }
}
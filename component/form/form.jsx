import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";

export default class Form extends Component{
    render(){
        return (<form ref="form">
            {this.props.children}
        </form>)
    }

    componentDidMount(){

    }
    getvalue = ()=>{
        //console.log(this.refs.form.getElementsByTagName("input"));
        let getValue = {};
        Array.prototype.slice.call(this.refs.form.getElementsByTagName("input")).forEach(value=>{
            getValue[value.name]=value.value
            
        })
        return getValue;
    }
}

export class TextBox extends Component{
    render(){
        return <input type="text" name={this.state.name} onChange = {this.handleChange}/>
    }
    constructor(props){
        super(props);
        this.state = {
            name:props.name?props.name:"",
            value:props.value?props.value:"",
        }
    }

    handleChange = (e)=>{
        this.setState({
            value:e.target.value
        });
        console.log(this);
    }
}
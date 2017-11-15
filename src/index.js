import React,{Component,ReactDOM} from "react";
import reactDOM,{render} from "react-dom";
import { Provider,connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import App from "./app.jsx";

reactDOM.render(
  	<App/>,
	document.getElementById('contain')
);

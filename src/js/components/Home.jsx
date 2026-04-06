import React from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import {TodolistApi} from "./TodolistApi.jsx"

//create your first component
const Home = () => {
	return (
		<div>
			<TodolistApi />
		</div>


	);
};

export default Home;
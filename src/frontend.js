import React from "react";
import ReactDom from "react-dom";
import "./frontend.scss";

const divsToUpdates = document.querySelectorAll(".paying-attention-update-me");

divsToUpdates.forEach((div) => {
	const data = JSON.parse(div.querySelector("pre").innerHTML);
	ReactDom.render(<Quiz {...data} />, div);
	div.classList.remove("paying-attention-update-me");
});

function Quiz(props) {
	return (
		<div className="paying-attention-frontend">
			<p>{props.question}</p>
			<ul>
				{props.answers.map((answer) => {
					return <li>{answer}</li>;
				})}
			</ul>
		</div>
	);
}

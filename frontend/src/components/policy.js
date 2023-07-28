import { useEffect } from "react";
import styled from "styled-components";

function Policy(props) {
	const { title, name, introduction, organizer, management } = props;

	return (
		<StyledDiv>
			<span class="title">{title}</span>
			<span id="type">{name}</span>
			<div class="else">
				<span>주관 : {organizer}</span>
				<span>운영 : {management}</span>
			</div>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	box-sizing: border-box;

	width: 300px;
	height: 300px;
	padding: 20px;
	margin: 15px;
	border: 1px solid lightgrey;
	border-radius: 20px;
	background-color: aliceblue;

	display: flex;
	position: relative;
	flex-direction: column;

	.title {
		font-size: 25px;
		word-spacing: -5px;
		font-weight: 800;
	}

	#type {
		background-color: gray;
		color: white;
		padding-left: 10px;
		width: 78px;
		margin-top: 5px;
	}

	.else {
		display: flex;
		align-content: flex-end;
		font-size: 13px;
		flex-direction: column;
		box-sizing: border-box;
		position: absolute;
		margin-bottom: 20px;
		bottom: 0;
	}
`;

export default Policy;

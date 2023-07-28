import { useEffect, useState } from "react";
import styled from "styled-components";

function Checkbox({ name, id, register }) {
	const [bgColor, setBgcolor] = useState("white");
	const onCheckboxClick = (e) => {
		if (e.target.checked) {
			setBgcolor("aliceblue");
		} else {
			setBgcolor("white");
		}
	};

	return (
		<StyledLabel
			htmlFor={id}
			onClick={onCheckboxClick}
			style={{ backgroundColor: bgColor }}
		>
			{name}
			<input {...register(name)} type="checkbox" id={id} />
		</StyledLabel>
	);
}

const StyledLabel = styled.label`
	width: 140px;
	height: 30px;
	margin-right: 5px;
	border: 1px solid lightgrey;

	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bolder;

	input {
		display: none;
	}
`;

export default Checkbox;

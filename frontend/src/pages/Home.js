import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

//정책 소개 메인 페이지
export default function Home() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const [bgColor, setBgcolor] = useState("yellow");

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div>
			<Container onSubmit={handleSubmit(onSubmit)}>
				<span
					style={{
						fontSize: 32,
						fontWeight: "bolder",
						marginBottom: 20,
					}}
				>
					청년정책 검색
				</span>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						boxSizing: "border-box",
						padding: 20,
						backgroundColor: "#f8f8f8",
						border: "1px solid #ccc",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							boxSizing: "border-box",
							marginBottom: 20,
							alignItems: "center",
						}}
					>
						<label
							style={{
								width: 80,
								marginBottom: "10px",
								marginRight: 20,
								marginLeft: "20px",
								fontSize: 18,
								fontWeight: 700,
							}}
						>
							정책 이름
						</label>
						<input
							{...register("policyName")}
							type="text"
							style={{
								width: "80%",
								padding: "0 10px",
								height: "40px",
							}}
							placeholder="키워드를 입력하세요"
						></input>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							boxSizing: "border-box",
							marginBottom: 10,
						}}
					>
						<label
							style={{
								width: 80,
								marginBottom: "10px",
								marginRight: 20,
								marginLeft: "20px",
								fontSize: 18,
								fontWeight: 700,
							}}
						>
							정책 분야
						</label>
						<label
							style={{
								width: "140px",
								height: "30px",
								backgroundColor: `${bgColor}`,
								marginRight: "5px",
							}}
							htmlFor="1"
							onClick={(e) => {
								setBgcolor((prev) =>
									prev === "yellow" ? "blue" : "yellow"
								);
								console.log(
									e.currentTarget.style.backgroundColor ===
										"yellow"
										? "blue"
										: "yellow"
								);
							}}
						>
							<input
								{...register("policyField")}
								type="checkbox"
								style={{ display: "none" }}
								id="1"
							/>
						</label>
					</div>

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							boxSizing: "border-box",
							marginBottom: 10,
							display: "flex",
							justifyContent: "space-between",
							width: "90%",
							alignItems: "center",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								boxSizing: "border-box",
								alignItems: "center",
							}}
						>
							<label
								style={{
									width: 80,
									marginRight: 20,
									marginLeft: "20px",
									fontSize: 18,
									fontWeight: 700,
								}}
							>
								연령
							</label>
							<span style={{ color: "grey" }}>
								만
								<input
									{...register("age")}
									type="number"
									style={{
										marginLeft: 10,
										marginRight: 5,
										width: 60,
									}}
								></input>
								세
							</span>
						</div>
						<button
							style={{
								border: "none",
								backgroundColor: "#1351b8",
								color: "white",
								fontSize: 18,
								fontWeight: "bolder",
								padding: "10px 20px",
							}}
						>
							검색
						</button>
					</div>
				</div>
			</Container>
			<div style={{ marginTop: "60px" }}>
				<span style={{ fontSize: 36, fontWeight: "bolder" }}>
					청년정책 검색 결과
				</span>
				<div
					style={{
						width: 300,
						height: 300,
						backgroundColor: "lightcyan",
						boxSizing: "border-box",
						padding: 20,
						marginTop: "20px",
						borderRadius: "20px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<span
						style={{
							fontSize: 20,
							wordSpacing: "-5px",
							fontWeight: 700,
						}}
					>
						쳥년 취창업 아카데미 연중 운영
					</span>
					<span style={{}}>부산시</span>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							boxSizing: "border-box",
							paddingLeft: "5px",
							paddingRight: "5px",
						}}
					>
						<span>상시</span>
						<span>일자리분야</span>
					</div>
				</div>
			</div>
		</div>
	);
}

const Container = styled.form`
	box-sizing: border-box;

	padding-top: 80px;

	display: flex;
	flex-direction: column;
`;

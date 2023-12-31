import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

import Policy from "../components/Policy";
import Checkbox from "../components/Checkbox";

//정책 소개 메인 페이지
export default function Home() {
	const { register, handleSubmit } = useForm();

	const [questionsFromServer, setQuestionsFromServer] = useState([]);
	const [uploadedPolicy, setUploadedPolicy] = useState([]);
	const [allPolicys, setAllPolicys] = useState([]);

	useEffect(() => {
		axios
			.all([axios.get("/api/type"), axios.get("/api/policy")])
			.then(
				axios.spread((response1, response2) => {
					setQuestionsFromServer(response1.data);
					setUploadedPolicy(response2.data);
					setAllPolicys(response2.data);
				})
			)
			.catch((error) => {
				console.error(
					"There was an error fetching data from server",
					error
				);
			});
	}, []);

	const [itemsPerPage, setItemsPerPage] = useState(40);
	const [page, setPage] = useState(0);

	const allPolicyForPage = Array.from(
		{ length: Math.ceil(uploadedPolicy.length / itemsPerPage) },
		(_, index) =>
			uploadedPolicy.slice(
				index * itemsPerPage,
				(index + 1) * itemsPerPage
			)
	);

	const onSubmit = (data) => {
		const condition = {};

		condition.keywords = data.policyName.split(",");
		condition.age = data.age;
		condition.type = Object.keys(data).filter((key) => data[key] === true);

		if (condition.type.length === 0) {
			alert("하나 이상의 정책 분야를 선택해주세요.");
		} else {
			axios
				.get("/api/policy/detail", {
					params: { condition: condition },
				})
				.then((response) => {
					setUploadedPolicy(response.data);
					setPage(0);
				})
				.catch((error) => {
					console.error(
						"There was an error fetching data from server",
						error
					);
				});
		}
	};

	return (
		<div>
			<Container onSubmit={handleSubmit(onSubmit)}>
				<div
					style={{
						marginBottom: "20px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<span style={{ fontSize: 24, fontWeight: "bolder" }}>
						최근 정책 알림
					</span>
					<div
						style={{
							display: "flex",
							gap: 50,
							margin: "30px 20px",
							alignItems: "center",
							justifyContent: "space-between",
							flewFlow: "wrap",
						}}
					>
						{allPolicys &&
							allPolicys.slice(0, 4).map((row) => {
								return (
									<a
										key={row.policy_id}
										href={`/detail/${row.policy_id}`}
										style={{
											textDecoration: "none",
											color: "black",
										}}
									>
										<Policy
											title={row.title}
											name={row.name}
											introduction={row.introduction} // 오타 수정: intoduction -> introduction
											organizer={row.organizer}
											management={row.management}
										/>
									</a>
								);
							})}
					</div>
				</div>

				<span
					style={{
						fontSize: 32,
						fontWeight: "bolder",
						marginBottom: 20,
					}}
				>
					정책 검색
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
						{questionsFromServer.length > 0 &&
							questionsFromServer.map((row) => {
								return (
									<Checkbox
										id={row.id}
										key={row.id} // 각 항목은 고유한 key prop을 가져야 합니다.
										name={row.name}
										register={register}
									/>
								);
							})}
					</div>

					<div
						style={{
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
								borderRadius: "10px",
							}}
							onClick={handleSubmit(onSubmit)}
						>
							검색
						</button>
					</div>
				</div>
			</Container>
			<div
				style={{
					marginTop: "60px",
					textAlign: "center",
				}}
			>
				<div style={{ width: "100%", textAlign: "left" }}>
					<span
						style={{
							fontSize: 24,
							fontWeight: "bolder",
						}}
					>
						정책 검색 결과{" "}
						<span style={{ color: "blue", fontSize: 30 }}>
							{uploadedPolicy.length}
						</span>
						{"   "}건
					</span>
				</div>
				<div
					style={{
						display: "inline-flex",
						alignContent: "flex-start",
						flexWrap: "wrap",
						justifyContent: "center",
						minWidth: "1000px",
						maxWidth: "1500px",
					}}
				>
					{allPolicyForPage[page] &&
						allPolicyForPage[page].map((row) => {
							return (
								<a
									key={row.policy_id}
									href={`/detail/${row.policy_id}`}
									style={{
										textDecoration: "none",
										color: "black",
									}}
								>
									<Policy
										title={row.title}
										name={row.name}
										introduction={row.introduction} // 오타 수정: intoduction -> introduction
										organizer={row.organizer}
										management={row.management}
									/>
								</a>
							);
						})}
				</div>
			</div>

			<div id="table-footer">
				<nav aria-label="Page navigation example">
					<ul className="pagination">
						<li className="page-item">
							<p
								className="page-link"
								onClick={() => {
									if (page > 0) {
										setPage(page - 1);
									} else {
										alert("첫 페이지 입니다.");
									}
								}}
							>
								Previous
							</p>
						</li>
						{Array.from(
							{ length: allPolicyForPage.length },
							(_, index) => (
								<li key={index} className="page-item">
									<p
										className={`page-link${
											index === page ? " active" : ""
										}`}
										onClick={() => setPage(index)}
									>
										{index + 1}
									</p>
								</li>
							)
						)}
						<li className="page-item">
							<p
								className="page-link"
								onClick={() => {
									if (page < allPolicyForPage.length - 1) {
										setPage(page + 1);
									} else {
										alert("마지막 페이지 입니다.");
									}
								}}
							>
								Next
							</p>
						</li>
					</ul>
				</nav>
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

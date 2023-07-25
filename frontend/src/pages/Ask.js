import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Ask.css";
import axios from "axios";

//신문고
export default function Ask() {
	const [uploadedQuestion, setUploadedQuestion] = useState([]);
	const [questionsFromServer, setQuestionsFromServer] = useState([]);

	useEffect(() => {
		axios
			.all([axios.get("/api/type"), axios.get("/api/asks")])
			.then(
				axios.spread((response1, response2) => {
					setQuestionsFromServer(response1.data);
					setUploadedQuestion(response2.data);
				})
			)
			.catch((error) => {
				console.error(
					"There was an error fetching data from server",
					error
				);
			});
	}, []);

	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(0);

	const allQuestionsForPage = Array.from(
		{ length: Math.ceil(uploadedQuestion.length / itemsPerPage) },
		(_, index) =>
			uploadedQuestion.slice(
				index * itemsPerPage,
				(index + 1) * itemsPerPage
			)
	);

	const handleSelectChange = (event) => {
		setItemsPerPage(event.target.value);
		setPage(0); // Reset the page when itemsPerPage changes
	};

	async function handleRecommendation(row) {
		try {
			await axios.post(`/api/asks/${row.ask_id}/recommendation`, null, {
				params: {
					recommendation: row.recommendation,
				},
			});
		} catch (error) {
			console.error("Error sending recommendation:", error);
		}
	}

	return (
		<div className="page-wrapper">
			<div id="page-title">신문고</div>

			<ul className="nav nav-tabs">
				<li className="nav-item">
					<p
						className="nav-link active"
						aria-current="page"
						href="#"
					>
						전체 보기
					</p>
				</li>
				{questionsFromServer.map((row) => (
					<li className="nav-item" key={row.type_id}>
						<p className="nav-link" value={row.type}>
							{row.name}
						</p>
					</li>
				))}
			</ul>

			<div>
				<div id="table-header">
					<div id="table-header-left">
						<span className="header-text">검색 건수</span>
						<span className="header-text" id="item-number">
							{uploadedQuestion.length}
						</span>
						<span className="header-text">건</span>
					</div>

					<div id="table-header-right">
						<select
							className="form-select"
							id="table-select"
							value={itemsPerPage}
							onChange={handleSelectChange}
						>
							<option key="10" value="10">
								10개
							</option>
							<option key="15" value="15">
								15개
							</option>
							<option key="30" value="30">
								30개
							</option>
						</select>

						<button
							type="button"
							className="btn btn-primary"
							id="table-button"
						>
							<Link to={`/ask/write`}>글 작성</Link>
						</button>
					</div>
				</div>

				<div id="table-body">
					<table className="table">
						<thead className="table-group-divider">
							<tr className="table-light">
								<th valign="middle" scope="col">
									번호
								</th>
								<th valign="middle" scope="col">
									구분
								</th>
								<th valign="middle" scope="col">
									제목
								</th>
								<th valign="middle" scope="col">
									등록일
								</th>
								<th valign="middle" scope="col">
									조회수
								</th>
							</tr>
						</thead>
						<tbody>
							{allQuestionsForPage[page] &&
								allQuestionsForPage[page].map((row, index) => (
									<tr key={row.id}>
										<th scope="row">{index + 1}</th>
										<td>{row.name}</td>
										<td
											onClick={() =>
												handleRecommendation(row)
											}
										>
											<Link
												className="link-no-underline"
												to={`/ask/${row.ask_id}`}
												state={{ row }}
											>
												{row.title}
											</Link>
										</td>
										<td>{row.created_at.slice(0, 10)}</td>
										<td>{row.recommendation}</td>
									</tr>
								))}
						</tbody>
					</table>
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
								{ length: allQuestionsForPage.length },
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
										if (
											page <
											allQuestionsForPage.length - 1
										) {
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
		</div>
	);
}

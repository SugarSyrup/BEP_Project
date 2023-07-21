import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Ask.css";

//신문고
export default function Ask() {
	const uploadedQuestion = Array.from({ length: 56 }, (_, index) => ({
		id: index + 1,
		type: `example_type_${index + 1}`,
		title: `Example Title ${index + 1}`,
		upload_date: "2023-07-19",
		recommendation: Math.floor(Math.random() * 100),
	}));

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

	return (
		<div className="page-wrapper">
			<div id="page-title">신문고</div>

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
							aria-label="Default select example"
							value={itemsPerPage}
							onChange={handleSelectChange}
						>
							<option value="10">10개</option>
							<option value="15">15개</option>
							<option value="30">30개</option>
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
									추천수
								</th>
							</tr>
						</thead>
						<tbody>
							{allQuestionsForPage[page].map((row) => (
								<tr key={row.id}>
									<th scope="row">{row.id}</th>
									<td>{row.type}</td>
									<td>
										<Link
											to={`/ask/${row.id}`}
											state={{ row }}
										>
											{row.title}
										</Link>
									</td>
									<td>{row.upload_date}</td>
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

import React from "react";
import { Link } from "react-router-dom";
import "../css/Ask.css";

export default function AskWrite() {
	// 현재 날짜 객체를 생성
	const currentDate = new Date();

	// 년, 월, 일 정보를 가져옴
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 맞춤
	const day = String(currentDate.getDate()).padStart(2, "0"); // 날짜를 두 자리로 맞춤

	// 오늘 날짜를 'YYYY-MM-DD' 형식으로 만듦
	const formattedDate = `${year}-${month}-${day}`;

	const data = {
		title: "",
		type: "",
		content: "",
		recommendation: 0,
		upload_date: formattedDate,
	};

	function submitData() {
		const title = document.querySelector("#input-title").value;
		const type = document.querySelector("#input-type").value;
		const content = document.querySelector("#input-content").value;

		if (title === "" || type === "" || content === "") {
			alert("내용을 모두 입력해주세요.");
		} else {
			data.title = title;
			data.type = type;
			data.content = content;

			console.log(data);
		}
	}

	return (
		<div className="page-wrapper">
			<div id="page-title">신문고 글 작성</div>

			<div id="table-body">
				<table className="table">
					<tbody className="table-group-divider">
						<tr>
							<td className="table-light">제목</td>
							<td colSpan="3">
								<input id="input-title"></input>
							</td>
						</tr>
						<tr>
							<td className="table-light">구분</td>
							<td>
								<input id="input-type"></input>
							</td>
							<td className="table-light">등록일</td>
							<td>{data.upload_date}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div>
				<textarea
					className="content-body"
					id="input-content"
				></textarea>
			</div>
			<div className="table-body">
				<table className="table table-borderless">
					<tbody className="table-group-divider" id="before-wrapper">
						<tr>
							<td colSpan="2">
								<button
									id="before"
									type="button"
									className="btn btn-secondary btn-lg"
								>
									<Link to="/ask">이전으로</Link>
								</button>
							</td>
							<td>
								<button
									id="before"
									type="button"
									className="btn btn-primary btn-lg"
									onClick={submitData}
								>
									등록하기
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

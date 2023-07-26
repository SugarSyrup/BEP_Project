import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Ask.css";
import axios from "axios";

export default function AskWrite() {
	const navigate = useNavigate();

	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 맞춤
	const day = String(currentDate.getDate()).padStart(2, "0"); // 날짜를 두 자리로 맞춤
	const formattedDate = `${year}-${month}-${day}`;

	const [typeList, setTypeList] = useState(null);
	const [itemsType, setitemType] = useState(null);

	const handleSelectChange = (event) => {
		setitemType(event.target.value);
	};

	const data = {
		title: "",
		type_id: "",
		content: "",
		writer_name: "",
		password: "",
	};

	useEffect(() => {
		axios
			.get("/api/type")
			.then((response) => {
				setTypeList(response.data);
			})
			.catch((error) => {
				console.error(
					"There was an error fetching data from server",
					error
				);
			});
	}, []);

	function submitData() {
		const title = document.querySelector("#input-title").value;
		const type = document.querySelector("#type-select").value;
		const content = document.querySelector("#input-content").value;
		const writer_name = document.querySelector("#input-writer").value;
		const password = document.querySelector("#input-password").value;

		if (
			title === "" ||
			type === "" ||
			content === "" ||
			writer_name === "" ||
			password === ""
		) {
			alert("내용을 모두 입력해주세요.");
		} else if (type === "none") {
			alert("게시글 구분을 선택해주세요.");
		} else if (!(password.length === 4 && /^[0-9]*$/.test(password))) {
			alert("비밀번호는 4글자인 숫자만 입력 가능합니다.");
		} else {
			data.title = title;
			data.content = content;
			data.type_id = type;
			data.writer_name = writer_name;
			data.password = password;
			postAsks();
		}
	}

	async function postAsks() {
		try {
			await axios.post(`/api/asks/write`, data);
			navigate("/ask");
		} catch (error) {
			console.error("Error sending recommendation:", error);
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
								<input
									id="input-title"
									placeholder="제목을 입력해주세요."
								></input>
							</td>
						</tr>
						<tr>
							<td className="table-light">구분</td>
							<td>
								<select
									className="form-select"
									id="type-select"
									value={itemsType || "none"}
									onChange={handleSelectChange}
								>
									<option key="none" value="none">
										구분 선택
									</option>
									{typeList &&
										typeList.map((row) => (
											<option
												key={row.type_id}
												value={row.type_id}
											>
												{row.name}
											</option>
										))}
								</select>
							</td>
							<td className="table-light">등록일</td>
							<td>{formattedDate}</td>
						</tr>
						<tr>
							<td className="table-light">작성자</td>
							<td>
								<input
									id="input-writer"
									placeholder="이름을 입력해주세요."
								></input>
							</td>
							<td className="table-light">비밀번호</td>
							<td>
								<input
									id="input-password"
									placeholder="숫자 4글자를 입력해주세요."
								></input>
							</td>
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

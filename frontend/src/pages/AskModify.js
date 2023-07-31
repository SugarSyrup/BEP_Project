import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style/Ask.css";
import axios from "axios";

export default function AskModify() {
	const navigate = useNavigate();

	const location = useLocation();
	const passedData = location.state?.data;

	const [typeList, setTypeList] = useState(null);
	const [itemsType, setitemType] = useState(passedData[0].type_id);

	const handleSelectChange = (event) => {
		setitemType(event.target.value);
	};

	const [title, setTitle] = useState(passedData[0].title);
	const [writerName, setWriterName] = useState(passedData[1].writer_name);
	const [password, setPassword] = useState(String(passedData[1].password));
	const [content, setContent] = useState(passedData[1].content);

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
		if (
			title === "" ||
			itemsType === "" ||
			content === "" ||
			writerName === "" ||
			password === ""
		) {
			alert("내용을 모두 입력해주세요.");
		} else if (itemsType === "none") {
			alert("게시글 구분을 선택해주세요.");
		} else if (!(password.length === 4 && /^[0-9]*$/.test(password))) {
			alert("비밀번호는 4글자인 숫자만 입력 가능합니다.");
		} else {
			const data = {};
			data.title = title;
			data.content = content;
			data.type_id = itemsType;
			data.writer_name = writerName;
			data.password = password;
			data.ask_id = passedData[0].ask_id;
			postAsksModify(data);
		}
	}

	async function postAsksModify(data) {
		try {
			await axios.post(`/api/asks/info/modify`, data);
			alert("게시글이 수정되었습니다.");
			navigate("/ask");
		} catch (error) {
			console.error("Error sending recommendation:", error);
		}
	}

	return (
		<div className="page-wrapper">
			<div id="page-title">신문고 글 수정</div>

			<div id="table-body">
				<table className="table">
					<tbody className="table-group-divider">
						<tr>
							<td className="table-light">제목</td>
							<td colSpan="3">
								<input
									id="input-title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
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
							<td className="table-light">작성일</td>
							<td>{passedData[0].created_at.slice(0, 10)}</td>
						</tr>
						<tr>
							<td className="table-light">작성자</td>
							<td>
								<input
									id="input-writer"
									value={writerName}
									onChange={(e) =>
										setWriterName(e.target.value)
									}
									placeholder="이름을 입력해주세요."
								></input>
							</td>
							<td className="table-light">비밀번호</td>
							<td>
								<input
									id="input-password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
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
					value={content}
					onChange={(e) => setContent(e.target.value)}
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

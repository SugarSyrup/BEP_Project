import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Ask.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function AskDetail() {
	const navigate = useNavigate();

	const location = useLocation();
	const data = location.state.row;

	const detailDataRef = useRef(null);
	const [detailData, setDetailData] = useState(null);

	useEffect(() => {
		axios
			.get(`/api/asks/${data.ask_id}`)
			.then((response) => {
				detailDataRef.current = response.data[0];
				setDetailData(response.data[0]);
			})
			.catch((error) => {
				console.error(
					"There was an error fetching data from server",
					error
				);
			});
	}, [data.ask_id]);

	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(false);
		setAuthor("");
		setPassword("");
		setButtonDisabled(true);
	};
	const handleShow = () => {
		setShow(true);
	};

	const [writerName, setAuthor] = useState("");
	const [password, setPassword] = useState("");
	const [isButtonDisabled, setButtonDisabled] = useState(true);

	const handleAuthorChange = (e) => {
		const writerNameValue = e.target.value;
		setAuthor(writerNameValue);
		checkButtonDisabled(writerNameValue, password);
	};

	const handlePasswordChange = (e) => {
		const passwordValue = e.target.value;
		setPassword(passwordValue);
		checkButtonDisabled(writerName, passwordValue);
	};

	const checkButtonDisabled = (writerNameValue, passwordValue) => {
		// 작성자명과 비밀번호 모두 작성되어야 버튼을 활성화
		setButtonDisabled(!writerNameValue || !passwordValue);
	};

	const handleDelete = () => {
		if (!(password.length === 4 && /^[0-9]*$/.test(password))) {
			alert("비밀번호는 숫자 4글자 입니다. 다시 입력해주세요.");
		} else {
			postDelete();
		}
	};

	async function postDelete() {
		try {
			await axios
				.post(`/api/asks/delete`, {
					writer_name: writerName,
					password: password,
					ask_id: data.ask_id,
				})
				.then((response) => {
					if (response.data.message === "Data not found") {
						alert(
							"입력하신 정보가 일치하지 않습니다. 다시 작성해주세요."
						);
					} else {
						alert("게시글이 삭제되었습니다.");
						handleClose();
						navigate("/ask");
					}
				});
		} catch (error) {
			console.error("Error sending recommendation:", error);
		}
	}

	return (
		<div className="page-wrapper">
			<div id="page-title">신문고 상세 내용</div>

			<div className="table-body">
				<table className="table">
					<tbody className="table-group-divider">
						<tr>
							<td colSpan="4">{data.title}</td>
						</tr>
						<tr>
							<td className="table-light">구분</td>
							<td>{data.name}</td>
							<td className="table-light">등록일</td>
							<td>{data.created_at.slice(0, 10)}</td>
						</tr>
						<tr>
							<td className="table-light">작성자</td>
							<td>
								{detailData
									? detailData.writer_name.slice(0, 1) + "**"
									: "Loading..."}
							</td>
							<td className="table-light">비밀번호</td>
							<td>
								{detailData
									? String(detailData.password).slice(0, 1) +
									  "***"
									: "Loading..."}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="content-body">
				<div id="content">
					{detailData ? detailData.content : "Loading..."}
				</div>
				<div id="button-wrapper">
					<button type="button" className="btn btn-primary">
						글 수정
					</button>
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleShow}
					>
						글 삭제
					</button>

					<Modal
						show={show}
						onHide={handleClose}
						backdrop="static"
						keyboard={false}
						centered
					>
						<Modal.Header closeButton>
							<Modal.Title>
								작성하신 글을 삭제하시겠습니까?
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p>
								삭제를 희망하시면 작성자명과 비밀번호를
								입력해주세요.
							</p>
							<div id="form-wrapper">
								<div className="input-group mb-3">
									<span
										className="input-group-text"
										id="basic-addon1"
									>
										작성자명
									</span>
									<input
										type="text"
										className="form-control"
										aria-label="Username"
										aria-describedby="basic-addon1"
										value={writerName}
										onChange={handleAuthorChange}
										placeholder="이름을 입력해주세요."
									></input>
								</div>
								<div className="input-group mb-3">
									<span
										className="input-group-text"
										id="basic-addon1"
									>
										비밀번호
									</span>
									<input
										type="password"
										className="form-control"
										aria-label="Password"
										aria-describedby="basic-addon2"
										value={password}
										onChange={handlePasswordChange}
										placeholder="숫자 4글자를 입력해주세요."
									></input>
								</div>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<button
								className="btn btn-secondary"
								onClick={handleClose}
							>
								취소
							</button>
							<button
								className={`btn btn-primary ${
									isButtonDisabled ? "disabled" : ""
								}`}
								onClick={handleDelete}
							>
								삭제
							</button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>

			<div id="content-footer">
				<div className="table-body">
					<table className="table table-borderless">
						<tbody
							className="table-group-divider"
							id="before-wrapper"
						>
							<tr>
								<td colSpan="4">
									<button
										id="before"
										type="button"
										className="btn btn-primary btn-lg"
									>
										<Link to="/ask">이전으로</Link>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

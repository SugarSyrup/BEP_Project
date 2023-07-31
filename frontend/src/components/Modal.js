import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function ModalComponent({
	show,
	onClose,
	data,
	type,
	modalTitle,
	modalBody,
}) {
	const navigate = useNavigate();

	const handleClose = () => {
		onClose();
		setAuthor("");
		setPassword("");
		setButtonDisabled(true);
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

	const handleSubmit = () => {
		if (!(password.length === 4 && /^[0-9]*$/.test(password))) {
			alert("비밀번호는 숫자 4글자 입니다. 다시 입력해주세요.");
		} else {
			getInfo();
		}
	};

	async function getInfo() {
		try {
			await axios
				.get(`/api/asks/info`, {
					writer_name: data[1].writer_name,
					password: data[1].password,
					ask_id: data[0].ask_id,
				})
				.then((response) => {
					if (response.data.message === "Data not found") {
						alert(
							"입력하신 정보가 일치하지 않습니다. 다시 작성해주세요."
						);
					} else {
						type === "삭제"
							? postDelete()
							: navigate("/ask/modify", {
									state: { data: data },
							  });
					}
				});
		} catch (error) {
			console.error("Error sending recommendation:", error);
		}
	}

	async function postDelete() {
		try {
			await axios
				.post(`/api/asks/info/delete`, {
					writer_name: data[1].writer_name,
					password: data[1].password,
					ask_id: data[0].ask_id,
				})
				.then((response) => {
					alert("게시글이 삭제되었습니다.");
					handleClose();
					navigate("/ask");
				});
		} catch (error) {
			console.error("Error sending recommendation:", error);
		}
	}

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>{modalTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{modalBody}</p>
				<div id="form-wrapper">
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">
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
						/>
					</div>
					<div className="input-group mb-3">
						<span className="input-group-text" id="basic-addon1">
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
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button className="btn btn-secondary" onClick={handleClose}>
					취소
				</button>
				<button
					className={`btn btn-primary ${
						isButtonDisabled ? "disabled" : ""
					}`}
					onClick={handleSubmit}
				>
					{type}
				</button>
			</Modal.Footer>
		</Modal>
	);
}

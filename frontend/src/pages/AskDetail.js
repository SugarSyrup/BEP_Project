import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Ask.css";
import axios from "axios";
import ModalComponent from "../components/Modal";

export default function AskDetail() {
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

	const [deleteModalShow, setDeleteModalShow] = useState(false);
	const [modifyModalShow, setModifyModalShow] = useState(false);

	const handleDeleteModalClose = () => {
		setDeleteModalShow(false);
	};
	const handleDeleteModalShow = () => {
		setDeleteModalShow(true);
	};

	const handleModifyModalClose = () => {
		setModifyModalShow(false);
	};
	const handleModifyeModalShow = () => {
		setModifyModalShow(true);
	};

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
					<button
						type="button"
						className="btn btn-secondary ask-detail-button"
						onClick={handleModifyeModalShow}
					>
						글 수정
					</button>

					<ModalComponent
						show={modifyModalShow}
						onClose={() => handleModifyModalClose(false)}
						data={[data, detailData]}
						type="수정"
						modalTitle="작성하신 글을 수정하시겠습니까?"
						modalBody="수정을 희망하시면 작성자명과 비밀번호를 입력해주세요."
					/>

					<button
						type="button"
						className="btn btn-secondary ask-detail-button"
						onClick={handleDeleteModalShow}
					>
						글 삭제
					</button>

					<ModalComponent
						show={deleteModalShow}
						onClose={() => handleDeleteModalClose(false)}
						data={[data, detailData]}
						type="삭제"
						modalTitle="작성하신 글을 삭제하시겠습니까?"
						modalBody="삭제를 희망하시면 작성자명과 비밀번호를 입력해주세요."
					/>
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

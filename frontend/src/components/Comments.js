import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "styled-components";

import { AiOutlineHeart } from "react-icons/ai";

function Comments(props) {
	const { id } = useParams();
	const [comments, setComments] = useState([]);

	useEffect(() => {
		getComments();
	}, []);

	function getComments() {
		axios.get(`/api/policy/${id}/getComment`).then((response) => {
			setComments(response.data);
		});
	}

	const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);

		axios
			.post(`/api/policy/${id}/postComment`, data)
			.then(window.location.reload());
	};

	return (
		<div style={{ marginTop: "70px", width: "60%" }}>
			<span
				style={{ fontSize: 36, fontWeight: "bolder", color: "black" }}
			>
				후기
			</span>

			<StyledBootstrapForm
				onSubmit={onSubmit}
				className="mt-3 p-4 bg-light border rounded"
			>
				<div className="mb-3 d-flex justify-content-between">
					<label className="form-label">이름 : </label>
					<input
						type="text"
						name="writer"
						className="form-control"
					/>
					<label className="form-label ml-3">비밀번호 : </label>
					<input
						type="password"
						name="password"
						className="form-control"
					/>
				</div>
				<div className="mb-3">
					<textarea
						type="text"
						name="comment"
						id="content-box"
						className="form-control"
					/>
				</div>
				<button className="btn btn-primary">전송</button>
			</StyledBootstrapForm>

			{comments.map((comment) => {
				return (
					<div
						key={comment.policy_comment_id}
						className="card mb-3"
						style={{
							marginTop: "25px",
						}}
					>
						<div className="card-body">
							<div className="row">
								<div className="col-8">
									<h5 className="card-title">
										{comment.writer_name}
									</h5>
									<p className="card-text">
										{comment.content}
									</p>
								</div>
								<div className="col-4 d-flex align-items-center justify-content-end">
									<span className="fs-4 me-2">
										<AiOutlineHeart />
									</span>
									<span className="fs-5">
										{comment.recommendation}
									</span>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

const StyledBootstrapForm = styled.form`
	display: "inline-flex";
	flex-direction: "row";
  boxSizing: "border-box",
	justify-content: "space-between";
  align-content: "flex-start";
  align-items: "center";

	.form-label {
		margin-top: 10px;
	}

	.form-control {
		width: 40%;
	}

  #content-box {
    width: 100%
  }
`;

export default Comments;

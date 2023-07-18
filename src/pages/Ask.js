import React from "react";
import "../css/Ask.css";

//신문고
export default function Ask() {
	return (
		<div className="page-wrapper">
			<div id="page-title">신문고</div>

			<div>
				<div id="table-header">
					<div id="table-header-left">
						<span className="header-text">검색 건수</span>
						<span className="header-text" id="item-number">
							634
						</span>
						<span className="header-text">건</span>
					</div>

					<div id="table-header-right">
						<select
							className="form-select"
							id="table-select"
							aria-label="Default select example"
						>
							<option selected value="10">
								10개
							</option>
							<option value="30">30개</option>
							<option value="50">50개</option>
						</select>

						<button
							type="button"
							className="btn btn-primary"
							id="table-button"
						>
							보기
						</button>
					</div>
				</div>

				<div id="table-body">
					<table class="table">
						<thead>
							<tr class="table-light">
								<th scope="col">번호</th>
								<th scope="col">구분</th>
								<th scope="col">제목</th>
								<th scope="col">등록일</th>
								<th scope="col">추천수</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td colspan="2">Larry the Bird</td>
								<td>@twitter</td>
								<td>@mdo</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div id="table-footer">
					<nav aria-label="Page navigation example">
						<ul class="pagination">
							<li class="page-item">
								<a class="page-link" href="">
									Previous
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="">
									1
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="">
									2
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="">
									3
								</a>
							</li>
							<li class="page-item">
								<a class="page-link" href="">
									Next
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
}

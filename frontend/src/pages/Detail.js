import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import Comments from "../components/Comments";
import ContentRow from "../components/ContentRow";

//정책 소개 상세 페이지
export default function Detail() {
	const { id } = useParams();
	const [data, setData] = useState(0);

	useEffect(() => {
		axios.get(`/api/policy/${id}`).then((response) => {
			setData(response.data[0]);
		});
	}, []);
	return (
		<DetailWrapper>
			<span className="header">
				{data === 0 ? "Loading..." : data.title.slice(1, -1)}
			</span>
			{data !== 0 && (
				<>
					<span className="introduction" style={{ marginTop: 20 }}>
						{data.introduction.slice(1, -1)}
					</span>
					<ContentWrapper>
						{data.name && (
							<ContentRow title="정책분야" data={data.name} />
						)}
						{data.management && (
							<ContentRow
								title="지원사"
								data={data.management.slice(1, -1)}
							/>
						)}
						{data.organizer && (
							<ContentRow
								title="주관"
								data={data.organizer.slice(1, -1)}
							/>
						)}
						{data.support_size && (
							<ContentRow
								title="지원 규모(명)"
								data={data.support_size.slice(1, -1)}
							/>
						)}
						{data.support_detail && (
							<ContentRow
								title="지원 규모(상세)"
								data={data.support_detail.slice(1, -1)}
							/>
						)}
					</ContentWrapper>
					<ContentWrapper>
						<span
							style={{
								fontSize: 36,
								fontWeight: "bolder",
								color: "black",
								display: "block",
								marginBottom: "30px",
							}}
						>
							신청자격
						</span>

						{data.target_min && data.target_max && (
							<ContentRow
								title="연령"
								data={`만 ${data.target_min} ~ ${data.target_max}세`}
							/>
						)}
						{data.education && (
							<ContentRow title="학력" data={data.education} />
						)}
						{data.target_employment && (
							<ContentRow
								title="취업 상태"
								data={data.target_employment.slice(1, -1)}
							/>
						)}
						{data.target_restriction && (
							<ContentRow
								title="제한 사항"
								data={data.target_restriction.slice(1, -1)}
							/>
						)}
					</ContentWrapper>
				</>
			)}
			<Comments />
		</DetailWrapper>
	);
}

const DetailWrapper = styled.div`
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	.header {
		font-size: 36px;
		font-weight: bolder;
		margin-top: 40px;
	}
`;
const ContentWrapper = styled.div`
	margin-top: 60px;
	width: 60%;
`;

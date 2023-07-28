import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useParams } from 'react-router-dom';

//정책 소개 상세 페이지
export default  function Detail() {
  const {id} = useParams();

  useEffect(() => {

  }, [])

  return (
    <DetailWrapper>
        <span className="header">청년일자리지원사업</span>
        <ContentWrapper >
          <div className="content">
            <span className="type">정책분야</span>
            <span className="data">일자리분야</span>
          </div>
          <div className="content">
            <span className="type">사업 운영 기간</span>
            <span className="data">2023.04.01. ~ 2023.12.31.</span>
          </div>
          <div className="content">
            <span className="type">사업 신청 기간</span>
            <span className="data">상시</span>
          </div>
          <div className="content">
            <span className="type">지원 규모(명)</span>
            <span className="data">40명 (참여기업별 최대 5인 이하까지 지원 가능)</span>
          </div>
        </ContentWrapper>
        <ContentWrapper>
          <span style={{fontSize:36, fontWeight:'bolder', color:'black'}}>신청자격</span>
          
          <div className="content">
            <span className="type">연령</span>
            <span className="data">만 15세 ~ 34세</span>
          </div>
          
          <div className="content">
            <span className="type">거주지 및 소득</span>
            <span className="data">청년을 정규직으로 채용하여 고용노동부 청년내일채움공제에 가입한 전주시 소재 상시근로자 5인 이상 중소기업 중 제조업체</span>
          </div>
          
          <div className="content">
            <span className="type">취업 상태</span>
            <span className="data">미취업자</span>
          </div>
        </ContentWrapper>
        <div style={{marginTop:'70px', width:'70%'}}>
          <span style={{fontSize:36, fontWeight:'bolder', color:'black'}}>후기</span>
        </div>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  width:100%;
  
  display:flex;
  flex-direction:column;
  align-items:center;

  .header {
    font-size:36px;
    font-weight:bolder;
  }
`

const ContentWrapper = styled.div`
  margin-top:60px;
  width:70%;

  .content {
    display:flex;
    align-items:center;
    margin-bottom:20px;

    .type {
      display:inline-block;
      font-size:24px;
      font-weight:600;
      width:200px;
    }

    .data {
      font-size:20px;
      color:grey;
    }
  }
`
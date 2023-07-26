import React from "react";

//정책 소개 상세 페이지
export default  function Detail() {
  return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <span style={{fontSize:36, fontWeight:'bolder'}}>청년일자리지원사업</span>
        <div style={{marginTop:50, width:'70%'}}>
          <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
            <span style={{display:'inline-block',fontSize:24, fontWeight:600, width:200}}>정책분야</span>
            <span style={{fontSize:20, color:'grey'}}>일자리분야</span>
          </div>
          <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
            <span style={{display:'inline-block',fontSize:24, fontWeight:600, width:200}}>사업 운영 기간</span>
            <span style={{fontSize:20, color:'grey'}}>2023.04.01. ~ 2023.12.31.</span>
          </div>
          <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
            <span style={{display:'inline-block',fontSize:24, fontWeight:600, width:200}}>사업 신청 기간</span>
            <span style={{fontSize:20, color:'grey'}}>상시</span>
          </div>
          <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
            <span style={{display:'inline-block',fontSize:24, fontWeight:600, width:200}}>지원 규모(명)</span>
            <span style={{fontSize:20, color:'grey'}}>40명 (참여기업별 최대 5인 이하까지 지원 가능)</span>
          </div>
        </div>
        <div style={{marginTop:'70px', width:'70%'}}>
          <span style={{fontSize:36, fontWeight:'bolder', color:'black'}}>신청자격</span>
          
          <div style={{display:'flex', alignItems:'center', marginBottom:'20px', marginTop:'20px'}}>
            <span style={{display:'inline-block',fontSize:24, fontWeight:600, width:200}}>연령</span>
            <span style={{fontSize:20, color:'grey'}}>만 15세 ~ 34세</span>
          </div>
          
          <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
            <span style={{display:'inline-block',fontSize:24, fontWeight:600, width:200}}>거주지 및 소득</span>
            <span style={{marginLeft:80,fontSize:20, color:'grey'}}>청년을 정규직으로 채용하여 고용노동부 청년내일채움공제에 가입한 전주시 소재 상시근로자 5인 이상 중소기업 중 제조업체</span>
          </div>
          
          <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
            <span style={{display:'inline-block',fontSize:24, fontWeight:600, width:200}}>취업 상태</span>
            <span style={{fontSize:20, color:'grey'}}>미취업자</span>
          </div>
        </div>
        <div style={{marginTop:'70px', width:'70%'}}>
          <span style={{fontSize:36, fontWeight:'bolder', color:'black'}}>후기</span>
        </div>
    </div>
  );
}

import React from "react";
import styled from "styled-components";
import {useForm} from 'react-hook-form';

//정책 소개 메인 페이지
export default  function Home() {
  const {register, handleSubmit, watch, formState:{errors}} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <Container onSubmit={handleSubmit(onSubmit)}>
          <span style={{fontSize:32, fontWeight:'bolder', marginBottom:20}}>청년정책 검색</span>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', boxSizing:'border-box', padding:20, backgroundColor:'#f8f8f8', border:'1px solid #ccc'}}>
            <div style={{display:'flex', flexDirection:'row', boxSizing:'border-box', marginBottom:20}}>
              <label style={{width:80,marginBottom:'10px', marginRight:20, marginLeft: '20px', fontSize:18, fontWeight:700}}>정책 이름</label>
              <input {...register('policyName')} type="text" style={{width:'80%', padding:"0 10px"}} placeholder='키워드를 입력하세요'></input>
            </div>
            <div style={{display:'flex', flexDirection:'row', boxSizing:'border-box', marginBottom:10}}>
              <label style={{width:80, marginBottom:'10px', marginRight:20, marginLeft: '20px', fontSize:18, fontWeight:700}}>정책 분야</label>
              <span style={{width:'140px', height:'30px', backgroundColor:'yellow', marginRight:'5px'}}>
                <input {...register('policyField')} type="checkbox" style={{display:'none'}} id="1"/>
                <label htmlFor="1"></label>
              </span>
            </div>
            
            <div style={{display:'flex', flexDirection:'row', boxSizing:'border-box', marginBottom:10, display:'flex', justifyContent:'space-between', width:'90%', alignItems:'center'}}>
              <div style={{display:'flex', flexDirection:'row', boxSizing:'border-box', alignItems:'center'}}>
                <label style={{width:80, marginRight:20, marginLeft: '20px', fontSize:18, fontWeight:700}}>연령</label>
                <span style={{color:"grey"}}>
                  만
                  <input {...register('age')} type="number" style={{marginLeft:10, marginRight:5, width:60}}></input>
                  세
                </span>
              </div>
              <button style={{border:'none', backgroundColor:'#1351b8', color:'white', fontSize:18, fontWeight:'bolder', padding:'10px 20px'}}>검색</button>
            </div>
          </div>
      </Container>
      <div>
        <h1>청년정책 검색 결과</h1>
        <div>
          <span>
            정책 명
          </span>
          <span>내용</span>
        </div>
      </div>
    </div>
  );
}

const Container = styled.form`
  box-sizing:border-box;

  padding-top:80px;

  display:flex;
  flex-direction:column;
`
import React, { useState } from "react";
import styled from "styled-components";
import {useForm} from 'react-hook-form';

import Policy from "../components/Policy";
import Checkbox from "../components/Checkbox";
import Carousel from "../components/Carousel";


const exampleData = {
  id: '1',
  name: '청년 취창업 아카데미 연중 운영',
  location: '부산시',
  date: '상시',
  tag: '일자리분야'
}

//정책 소개 메인 페이지
export default  function Home() {
  const {register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <Container onSubmit={handleSubmit(onSubmit)}>

        <div style={{marginBottom:'40px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <span style={{fontSize:24, fontWeight:'bolder'}}>최근 정책 알림</span>
          <Carousel />
        </div>

          <span style={{fontSize:32, fontWeight:'bolder', marginBottom:20}}>정책 검색</span>
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center', boxSizing:'border-box', padding:20, backgroundColor:'#f8f8f8', border:'1px solid #ccc'}}>
            <div style={{display:'flex', flexDirection:'row', boxSizing:'border-box', marginBottom:20, alignItems:'center'}}>
              <label style={{width:80,marginBottom:'10px', marginRight:20, marginLeft: '20px', fontSize:18, fontWeight:700}}>정책 이름
              </label>
              <input {...register('policyName')} type="text" style={{width:'80%', padding:"0 10px", height:'40px'}} placeholder='키워드를 입력하세요'></input>
            </div>
            <div style={{display:'flex', flexDirection:'row', boxSizing:'border-box', marginBottom:10}}>
              <label style={{width:80, marginBottom:'10px', marginRight:20, marginLeft: '20px', fontSize:18, fontWeight:700}}>정책 분야</label>
              
              <Checkbox name="정책분야1" id="1" register={register('check1')}/>
              <Checkbox name="정책분야2" id="2" register={register('check2')}/>
              <Checkbox name="정책분야3" id="3" register={register('check3')}/>
              <Checkbox name="정책분야4" id="4" register={register('check4')}/>
              
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
              <button style={{border:'none', backgroundColor:'#1351b8', color:'white', fontSize:18, fontWeight:'bolder', padding:'10px 20px', borderRadius:'10px'}}>검색</button>
            </div>
          </div>
      </Container>
      <div style={{marginTop:'60px'}}>
        <span style={{fontSize:24, fontWeight:'bolder'}}>정책 검색 결과 <span style={{color:'blue', fontSize:40}}>189</span> 건</span>
        <div style={{display:'flex', gap:40}}>
          <Policy {...exampleData} />
          <Policy {...exampleData} />
          <Policy {...exampleData} />
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
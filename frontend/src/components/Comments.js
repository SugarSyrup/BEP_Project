import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from 'styled-components';

import { AiOutlineHeart } from "react-icons/ai";

function Comments(props) {
  const {id} = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/policy/${id}/comment`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
  },[])

  const onSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const {writer, password, comment} = data;

    axios.post(`/api/policy/${id}/comment`, {
      "writer_name": writer,
      "password" : password,
      "comment" : comment,
    })
  }

  return (
    <div style={{marginTop:'70px', width:'60%'}}>
      <span style={{fontSize:36, fontWeight:'bolder', color:'black'}}>후기</span>

      <CommentForm onSubmit={onSubmit} id="commentForm">
        <label>이름 : </label>
        <input type="text" name="wrtier" style={{marginLeft:'10px', marginRight:'60px'}} />
        <label>비밀번호 : </label>
        <input type="password" name="password" style={{marginLeft:'10px'}} />
        <div className="content">
          <textarea type="text" name="comment" form="commentForm" />
					<button>전송</button>
        </div>
      </CommentForm>

      {
        comments.map((comment) => {
          return(
            <CommentContainer key={comment.policy_comment_id} >
              <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                <span style={{fontWeight:'bolder', fontSize:'18px'}}>{comment.writer_name}</span>
                <span style={{marginLeft:'5px'}}>{comment.content}</span>
              </div>
              <div style={{width:'40px', height:'20px',display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:'20px'}}><AiOutlineHeart /></span>
                <span style={{marginRight:'10px', marginTop:'4px'}}>{comment.recommendation}</span>
              </div>
            </CommentContainer>
          )
        })
      }
    </div>
  )
}

const CommentForm = styled.form`
  width:90%;
  padding:20px 60px;
  margin-left:10px;
  background-color:#f8f8f8;
  box-sizing:border-box;
  margin-top:20px;
  border:1px solid #ccc;

  label {
    font-weight:bolder;
  }

  .content {
    margin-top:40px;
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
  }

  textarea {
    width:80%;
  }

  button {
    border:none;
    background-color:#1351b8;
    color:white;
    font-size:18px;
    font-weight:bolder;
    padding:10px 20px;
    border-radius:10px;
  }
`

const CommentContainer = styled.div`
  width:80%;

  margin-left:40px;
  margin-top:20px;

  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:flex-start;

  padding:20px 40px;
  background-color:#f8f8f8;

  border-radius:20px;
`

export default Comments;
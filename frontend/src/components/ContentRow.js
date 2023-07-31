import styled from 'styled-components';

function ContentRow(props) {
    return (
        <Wrapper>
            <span className="type">{props.title}</span>
            <span className="data">{props.data}</span>
        </Wrapper>

    )
}


const Wrapper = styled.div`
  
    display:flex;
    align-items:center;
    margin-bottom:20px;
    margin-left:20px;

    .type {
      display:inline-block;
      font-size:24px;
      font-weight:600;
      width:300px;
    }

    .data {
      font-size:20px;
      color:grey;
    }
  
`

export default ContentRow;
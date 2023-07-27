import styled from 'styled-components';

function Policy(props) {
    const {name, location, date, tag, currentref} = props;
    
    return(
    <StyledDiv ref={currentref}>
        <span class="title">{name}</span>
        <span>{location}</span>
        <div class="else">
            <span>{date}</span>
            <span>{tag}</span>
        </div>
    </StyledDiv>
    )
}

const StyledDiv = styled.div`
    box-sizing: border-box;
    
    width: 300px;
    height: 300px;
    padding: 20px;
    margin-top:20px;
    border-radius:20px;
    background-color: lightcyan;

    flex-shrink:0;
    display:flex;
    flex-direction:column;
    justify-content:space-between;

    transition:margin-left .5s ease-in-out;

    .title{
        font-size:20px;
        word-spacing:-5px;
        font-weight:700px;
    }

    .else {
        display:flex;
        justify-content:space-between;
        box-sizing:border-box;
        padding-left:5px;
        padding-right:5px;
    }
`

export default Policy;
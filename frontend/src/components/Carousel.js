import { useRef, useState } from 'react';
import styled from 'styled-components';

import Policy from './Policy';

const exampleData = {
    id: '1',
    name: '청년 취창업 아카데미 연중 운영',
    location: '부산시',
    date: '상시',
    tag: '일자리분야'
}

function Carousel(props) {
    const carouselRef = useRef(null);
    const [pos, setPos] = useState(0);

    return(
        <div style={{display:'flex', gap:40, marginBottom:'40px', alignItems:'center'}}>
            <CarouselButton onClick={() => {
                const currentPos = pos - 330;
                carouselRef.current.style.marginLeft = `${currentPos}px`;
                setPos(currentPos);
            }}>{`<`}</CarouselButton>
            <CarouselWrapper>
                    <Policy {...exampleData} currentref={carouselRef}/>
                    <Policy {...exampleData} />
                    <Policy {...exampleData} />
                    <Policy {...exampleData} />
                    <Policy {...exampleData} />
                    <Policy {...exampleData} />
                    <Policy {...exampleData} />
            </CarouselWrapper>
            <CarouselButton onClick={() => {
                const currentPos = pos + 330;
                carouselRef.current.style.marginLeft = `${currentPos}px`;
                setPos(currentPos);
            }}>{`>`}</CarouselButton>
      </div>
    )
}

const CarouselWrapper = styled.div`
    width:72vw;
    height:320px;

    display:flex;
    gap:30px;

    overflow:hidden;
`

const CarouselButton = styled.span`
    width:60px;
    height:60px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:44px;
    font-weight:bolder;
    z-index:10;
    border:1px solid black;
    border-radius:50%;
`

export default Carousel;
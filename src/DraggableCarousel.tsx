import {  useRef, useState } from 'react';
import './DraggableCarousel.css';
import { Tag } from 'antd';

export interface DraggableCarouselProps {
  items: string[];
}

export const  DraggableCarousel = ( { items } : DraggableCarouselProps) => {

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const innerSliderRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number>();

  const [cursor, setCursor ] = useState<string>("grab");
  const [pressed, setPressed] = useState<boolean>(false);

  const checkBoundary = () => {
    if (!sliderRef.current || !innerSliderRef.current) return;

    const outer = sliderRef.current.getBoundingClientRect();
    const inner = innerSliderRef.current.getBoundingClientRect();

    if (parseInt(innerSliderRef.current.style.left) > 0) {
        innerSliderRef.current.style.left = "0px";
    }

    if (inner.right < outer.right) {
        innerSliderRef.current.style.left = `-${inner.width - outer.width}px`;
    }
   };

   const handleMouseDown = (e: React.MouseEvent) => {  
    if (!innerSliderRef.current) return;
    setPressed(true);
    startX.current = e.nativeEvent.offsetX - innerSliderRef.current.offsetLeft;
    setCursor("grabbing");
  }

  const handleMouseEnter = () => {
    setCursor("grab");
  }

  const handleMouseLeave = () => {
    setCursor("default");
    setPressed(false);
  }

  const handleMouseUp = () => {
    setCursor("grab");
    setPressed(false);
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!pressed || !innerSliderRef.current) return;
    e.preventDefault();
    innerSliderRef.current.style.left = `${(e.nativeEvent.offsetX ?? 0) - (startX.current ?? 0)}px`;
    checkBoundary()
  }


  return (
    <div className="slider-container" ref={sliderRef}   
       onMouseDown={ (e) => handleMouseDown(e)}
       onMouseEnter={() => handleMouseEnter()} 
       onMouseLeave={() => handleMouseLeave()}
       onMouseUp={() => handleMouseUp()}
       onMouseMove={(e) => handleMouseMove(e)}
       style={{ cursor: cursor }}
       >
    <div className="inner-slider" ref={innerSliderRef}>
      {items.map((item) => (
          <Tag color="blue">{item}</Tag>
      ))}
      </div>
    </div>
  );
}


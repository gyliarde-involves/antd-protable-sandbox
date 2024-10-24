import {  useRef, useState } from 'react';
import './DraggableCarousel.css';


export const  DraggableCarousel = () => {

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const innerSliderRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number>();
  const x = useRef<number>();

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
  }

  const handleMouseUp = () => {
    setCursor("grab");
    setPressed(false);

  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!pressed || !innerSliderRef.current) return;
    e.preventDefault();
    x.current = e.nativeEvent.offsetX;
    innerSliderRef.current.style.left = `${(x.current ?? 0) - (startX.current ?? 0)}px`;
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
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`card ${i % 2 === 0 ? 'even' : 'odd'}`}>
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}


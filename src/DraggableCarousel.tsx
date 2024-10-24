import {  useState } from 'react';
import './DraggableCarousel.css';


export const  DraggableCarousel = () => {

let sliderContainer = document.querySelector('.slider-container') as HTMLElement;
let innerSlider = document.querySelector('.inner-slider') as HTMLElement;


  const [startX, setStartX] = useState<number>();
  const [x, setX] = useState<number>();
  const [cursor, setCursor ] = useState<string>("grab");
  const [pressed, setPressed] = useState<boolean>(false);

  console.log('cursor', cursor);

  const checkBoundary = () => {
    const outer = sliderContainer.getBoundingClientRect();
    const inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
        innerSlider.style.left = "0px";
    }

    if (inner.right < outer.right) {
        innerSlider.style.left = `-${inner.width - outer.width}px`;
    }
   };

   const handleMouseDown = (e: React.MouseEvent) => {  
    setPressed(true);
    setStartX(e.nativeEvent.offsetX - innerSlider.offsetLeft);
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
    if (!pressed) return;
    e.preventDefault();
    setX(e.nativeEvent.offsetX) 
    innerSlider.style.left = `${(x ?? 0) - (startX ?? 0)}px`;
    checkBoundary()
  }


  return (
    <div className="slider-container" ref={(el) => { if (el) sliderContainer = el; }} 
       onMouseDown={ (e) => handleMouseDown(e)}
       onMouseEnter={() => handleMouseEnter()} 
       onMouseLeave={() => handleMouseLeave()}
       onMouseUp={() => handleMouseUp()}
       onMouseMove={(e) => handleMouseMove(e)}
       style={{ cursor: cursor }}
       >
    <div className="inner-slider" ref={(el) => { if (el) innerSlider = el; }}>
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`card ${i % 2 === 0 ? 'even' : 'odd'}`}>
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}


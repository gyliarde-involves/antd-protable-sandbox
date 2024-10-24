import { useRef } from 'react';
import './DraggableCarousel.css';


export const  DraggableCarousel = () => {

const sliderContainer = document.querySelector('.slider-container') as HTMLElement;
const innerSlider = document.querySelector('.inner-slider') as HTMLElement;

  const pressed = useRef<boolean>(false);
  const startX = useRef<number>();
  const x = useRef<number>();


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

  if (sliderContainer) { 
    sliderContainer.addEventListener('mousedown', (e) => {
      pressed.current = true;
      startX.current = e.offsetX - innerSlider.offsetLeft;
      sliderContainer.style.cursor = "grabbing";
     })

     sliderContainer.addEventListener("mouseenter", () => {
        sliderContainer.style.cursor = "grab";
    });

    sliderContainer.addEventListener("mouseleave", () => {
        sliderContainer.style.cursor = "default";
    });

    sliderContainer.addEventListener("mouseup", () => {
        sliderContainer.style.cursor = "grab";
        pressed.current = false;
    });

    sliderContainer.addEventListener("mousemove", (e) => {
        if (!pressed) return;
        e.preventDefault();
        x.current = e.offsetX;
        innerSlider.style.left = `${(x.current ?? 0) - (startX.current ?? 0)}px`;
        checkBoundary()
    });
   }

  return (
    <div className="slider-container">
      <div className="inner-slider">
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`card ${i % 2 === 0 ? 'even' : 'odd'}`}>
            {/* Card content */}
          </div>
        ))}
      </div>
    </div>
  );
}


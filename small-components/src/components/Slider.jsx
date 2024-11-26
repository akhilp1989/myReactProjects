import { useState } from "react";
import "./Slider.styles.css";
// eslint-disable-next-line react/prop-types
export const Slider = ({ status, start, end }) => {
  const [progress, setProgress] = useState(status);
  const [leftPos, setLeftPos] = useState(100);
  const getWidth = () => {
    if (progress <= start) return 0;
    else if (progress >= end) return 100;
    return parseInt((progress / (end - start)) * 100);
  };

  const handleClick = (e) => {
    //  console.log(e.clientX, e.pageX, e.screenX, e);
    const { clientX, target } = e;

    console.log(
      target.clientWidth,
      target.clientLeft,
      clientX,
      target.offsetWidth
    );
    let { width } = getComputedStyle(target);
    width = parseFloat(width.split("px")[0]);
    console.log({ width, target });
    // const newX = clientX - target.offsetLeft;

    // setLeftPos(newX / width);
  };
  return (
    <div className="slider-wrapper">
      <input
        type="text"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
      />
      <div className="slider-container" onClick={(e) => handleClick(e)}>
        <div className="slider" style={{ width: `${getWidth()}%` }}>
          <button
            className="slider-button"
            style={{ insetInlineStart: `${leftPos}%` }}
          ></button>
        </div>
      </div>
      <div className="slider-footer">
        <div className="start">{start}</div>
        <div className="end">{end}</div>
      </div>
    </div>
  );
};

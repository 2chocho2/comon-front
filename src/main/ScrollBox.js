import { useState, useRef, useEffect } from "react";


function ScrollBox() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
    <div className="toTop">
        <button className="topBtn" onClick={scrollToTop}></button>
    </div>
    </>
  );
}

export default ScrollBox;

import React, { useState, useEffect } from "react";
import progressBar from "../../../assets/images/progressBar.svg";

const StarProgressBar = ({ progress }) => {
  const [angleRotation, setAngleRotation] = useState(-73);
  // const [widthProgressBar, setWidthProgressBar] = useState();
  const screenWidth = window.innerWidth;
  const multiplicateurWidth = "1.4853";
  // const multiplicateurTop = "0.1413";

  useEffect(() => {
    const plageRotation = 70;
    const angleDeDepart = -30;
    setAngleRotation((progress * plageRotation) / 100 + angleDeDepart);
  }, [progress]);

  // useEffect(() => {
  //   const multiplicateurWidth = "1,4667";
  //   setWidthProgressBar(screenWidth * multiplicateurWidth);
  // }, [window.innerWidth]);

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        loading="lazy"
        style={{
          position: "absolute",
          width: `calc(${screenWidth * multiplicateurWidth}`,
          top: "53px",
          transform: `rotate(${angleRotation}deg)`,
        }}
        src={progressBar}
        alt="barre de progression"
      />
    </div>
  );
};

export default StarProgressBar;

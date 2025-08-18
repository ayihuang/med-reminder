// src/components/PlantGrowth.jsx
import React, { useState, useEffect } from "react";
import "../App.css"; 

// Import all plant images
import stage1 from "../Assets/Plant 1/Stage 1.png";
import stage2 from "../Assets/Plant 1/Stage 2.png";
import stage3 from "../Assets/Plant 1/Stage 3.png";
import stage4 from "../Assets/Plant 1/Stage 4.png";
import stage5 from "../Assets/Plant 1/Stage 5.png";
import stage6 from "../Assets/Plant 1/Stage 6.png";
import stage7 from "../Assets/Plant 1/Stage 7.png";
import stage8 from "../Assets/Plant 1/Stage 8.png";
import stage9 from "../Assets/Plant 1/Stage 9.png";
import stage10 from "../Assets/Plant 1/Stage 10.png";
import stage11 from "../Assets/Plant 1/Stage 11.png";
import stage12 from "../Assets/Plant 1/Stage 12.png";
import stage13 from "../Assets/Plant 1/Stage 13.png";
import stage14 from "../Assets/Plant 1/Stage 14.png";

const stages = [
  stage1, stage2, stage3, stage4, stage5, stage6, stage7,
  stage8, stage9, stage10, stage11, stage12, stage13, stage14
];

export default function PlantGrowth() {
  const [stage, setStage] = useState(0);
  const [fade, setFade] = useState(true); // for fade animation
  const [lastDose, setLastDose] = useState(null);


  useEffect(() => {
    const savedStage = localStorage.getItem("plantStage");
    const savedDose = localStorage.getItem("lastDose"); 
    if (savedStage) setStage(parseInt(savedStage, 10));
    if (savedDose) setLastDose(savedDose);
  }, []);

  useEffect(() => {
    localStorage.setItem("plantStage", stage);
  }, [stage]);

  const handleDoseTaken = () => {
    // Fade out first
    setFade(false);
    setTimeout(() => {
      setStage(prev => (prev < stages.length - 1 ? prev + 1 : 0));
      // Full date and time
      const now = new Date();
      const formatted = now.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

      setLastDose(formatted);
      localStorage.setItem("lastDose", formatted);
      setFade(true); // Fade back in
    }, 500); // match transition duration
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Daily Bloom</h2>
      {/* state label */}
      <p style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#555" }}>
        Day {stage + 1} of {stages.length}
      </p>
      <img
        src={stages[stage]}
        alt={`Plant Stage ${stage + 1}`}
        className={fade ? "fade" : "fade fade-hidden"}
        style={{ maxWidth: "300px", height: "auto" }}
      />
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleDoseTaken} style={{ padding: "10px 20px" }}>
          Take Dose
        </button>
        <button
          className="download"
          onClick={() => {
            const ESP32_IP = "http://172.20.10.9";
            const downloadUrl = `${ESP32_IP}/log.csv`;
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "log.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          ⬇ Download Pill Log
        </button>
      </div>
      {lastDose && (
    <p style={{ marginTop: "10px", fontStyle: "italic" }}>
      Last dose taken: {lastDose}
    </p>
    )}

    </div>
  );
}

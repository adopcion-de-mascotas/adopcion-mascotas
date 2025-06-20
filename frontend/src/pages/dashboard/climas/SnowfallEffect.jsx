import { useEffect } from "react";
import "./SnowfallEffect.css";

export default function SnowfallEffect() {
  useEffect(() => {
    const interval = setInterval(() => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.textContent = "❄";
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return null;
}

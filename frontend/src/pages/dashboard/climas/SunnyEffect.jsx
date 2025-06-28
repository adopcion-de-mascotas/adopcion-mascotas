import { useEffect } from "react";
import "./SunnyEffect.css";

export default function SunnyEffect() {
  useEffect(() => {
    const interval = setInterval(() => {
      const sparkle = document.createElement("div");
      sparkle.className = "sun-sparkle";
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 5000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sun-icon">
      ☀️
    </div>
  );
}

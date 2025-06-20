import { useEffect } from "react";
import "./MoonEffect.css";

export default function MoonEffect() {
  useEffect(() => {
    const interval = setInterval(() => {
      const star = document.createElement("div");
      star.className = "moon-star";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 80}vh`; // estrellas en la parte alta
      star.style.animationDuration = `${Math.random() * 4 + 3}s`;
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 7000);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="moon-icon">
      🌙
    </div>
  );
}

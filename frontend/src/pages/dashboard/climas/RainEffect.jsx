import { useEffect } from "react";
import "./RainEffect.css";

export default function RainEffect() {
  useEffect(() => {
    const interval = setInterval(() => {
      const raindrop = document.createElement("div");
      raindrop.className = "raindrop";
      raindrop.style.left = `${Math.random() * 100}vw`;
      raindrop.style.animationDuration = `${Math.random() * 0.5 + 0.7}s`;
      document.body.appendChild(raindrop);

      setTimeout(() => {
        raindrop.remove();
      }, 1500);
    }, 100); // más gotas que la nieve

    return () => clearInterval(interval);
  }, []);

  return null;
}

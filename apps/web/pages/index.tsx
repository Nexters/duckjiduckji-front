import { useEffect } from "react";
import { Button } from "ui";

export default function Web() {
  function handleMouseMove(e) {
    console.log(e);
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}

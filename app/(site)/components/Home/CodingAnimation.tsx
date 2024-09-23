"use client";

import Image from "next/image";
import React from "react";
import { AppFoundedYear, AppFullName, UniversityAbbreviationName } from "../../config";

export const CodingAnimation = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Setting the width and height of the canvas
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    // Setting up the letters
    let letters: string | string[] = "01";
    letters = letters.split("");

    // Setting up the columns
    var fontSize = 16,
      columns = canvas.width / fontSize;

    // Setting up the drops
    const drops: number[] = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(30, 41, 59, .1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = "rgba(0, 200, 0, 1)";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    // Loop the animation
    setInterval(draw, 100);
  }, []);

  return (
    <>
      <div className="relative">
        <canvas
          className="w-full max-h-full"
          width={1920}
          height={1080}
          ref={canvasRef}
        ></canvas>
        <div className="absolute top-0 left-0 text-white">
          <div className="py-20 grid grid-cols-1 lg:grid-cols-2 text-center lg:text-left items-center mx-auto justify-center gap-4 lg:gap-8">
            <Image
              className="mx-auto"
              src="/CSA_Leaf_512x512.png"
              alt={`${AppFullName} Logo`}
              width={256}
              height={256}
              quality={100}
            />
            <div>
              <div className="text-2xl sm:text-3xl font-bold">
                {AppFullName}
              </div>
              <div className="text-lg sm:text-xl">
                Representing computing students to {UniversityAbbreviationName}{" "}
                faculty and staff since {AppFoundedYear}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

'use client'

import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import EditorStore from "../stores/EditorStore";
import initControls from "./controls/initControls";
import { ActiveObject } from "./features/ActiveObject";
import { WheelScroll } from "./features/WheelScroll";

const CanvasEditor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;
    const options = {
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundColor: "#eee",
    };

    const canvas = new fabric.Canvas("canvasID", options);
    EditorStore.setCanvas(canvas);

    initControls();

    new ActiveObject(canvas);
    new WheelScroll(canvas);

    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "red",
    });

    canvas.add(rect);
    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <>
      <div id="canvas-container" ref={containerRef} className="h-full w-full ">
        <canvas id="canvasID" />
      </div>
    </>
  );

}

export default CanvasEditor

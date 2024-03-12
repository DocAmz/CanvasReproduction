import * as fabric from "fabric";
import { Disposable, toDisposable } from "../utils/lifeCycle";
import EditorStore from "@/modules/stores/EditorStore";
import { debounce } from "lodash";


export class WheelScroll extends Disposable {
  private edgeMoveStatus: boolean = true;

  constructor(private readonly canvas: fabric.Canvas) {
    super();
    this.initWheelScroll();
    this.initEdgeMove();
  }

  private initWheelScroll() {

    const zoom = EditorStore.zoom;
    const max = 5;
    const min = 0.05;
    const mousWheel = (e: fabric.CanvasEvents["mouse:wheel"]) => {
      e.e.preventDefault();
      e.e.stopPropagation();

      const { deltaX, deltaY, offsetX, offsetY } = e.e;

      const zoomFactor = Math.abs(deltaY) < 10 ? deltaY * 2 : deltaY / 3;

      const canvasZoom = this.canvas.getZoom();

      let zoomVal = canvasZoom * (1 - zoomFactor / 200);

      if (zoomVal > 0.97 && zoomVal < 1.03) {
          zoomVal = 1;
      }
        if (zoomVal > max) {
          zoomVal = max
      }
      if (zoomVal < min) {
          zoomVal = min
      }
      EditorStore.setZoom(zoomVal)
      this.canvas.zoomToPoint(new fabric.Point(offsetX, offsetY), zoomVal);
      this.setCoords();

    };

    this.canvas.on("mouse:wheel", mousWheel);

    this._register(
      toDisposable(() => {
        this.canvas.off("mouse:wheel", mousWheel);
      })
    );
  }

  private setCoords = debounce(() => {
    const { renderOnAddRemove } = this.canvas;
    this.canvas.renderOnAddRemove = false;
    this.canvas.setViewportTransform(this.canvas.viewportTransform);
    this.canvas.renderOnAddRemove = renderOnAddRemove;
  }, 150);

  private initEdgeMove() {
    let event: fabric.TPointerEventInfo<fabric.TPointerEvent> | undefined;

    let needSetCoords = false;

    const edgeMoveLogic = () => {
      if (!event) return;

      const A = new fabric.Point(24, 24);
      const B = new fabric.Point(
        this.canvas.width,
        this.canvas.height
      ).subtract(A);
      const [pos, distance] = this.judgePosition(event.absolutePointer, A, B);
      if (pos === 0) return;

      let deltaPoint = new fabric.Point();
      const amount = Math.min(distance, 20);
      if (pos & 1) deltaPoint.x = amount;
      if (pos & 2) deltaPoint.x = -amount;
      if (pos & 4) deltaPoint.y = amount;
      if (pos & 8) deltaPoint.y = -amount;

      if (deltaPoint.x !== 0 || deltaPoint.y !== 0) {
        deltaPoint = deltaPoint.scalarDivide(1.5);
      }

      this.canvas.relativePan(deltaPoint);
      this.canvas._onMouseMove(event.e);
      needSetCoords = true;
    };
  }

  private judgePosition(
    T: fabric.Point,
    A: fabric.Point,
    B: fabric.Point
  ): [number, number] {
    let pos = 0;
    let distance = 0;
    if (T.x < A.x) (pos |= 1), (distance += A.x - T.x);
    else if (T.x > B.x) (pos |= 2), (distance += T.x - B.x);
    if (T.y < A.y) (pos |= 4), (distance += A.y - T.y);
    else if (T.y > B.y) (pos |= 8), (distance += T.y - B.y);
    return [pos, distance];
  }
}

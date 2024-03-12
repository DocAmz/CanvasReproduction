
import EditorStore from "@/modules/stores/EditorStore";
import { Disposable } from "../utils/lifeCycle";
import * as fabric from "fabric";


export class ActiveObject extends Disposable {
  private _canvasEvent
  private _activeObject: fabric.Object | null = null;

  constructor(private readonly _canvas: fabric.Canvas) {
    super();
    this._canvasEvent = {
      "mouse:down": this._onMouseDown.bind(this),
    }

    _canvas.on(this._canvasEvent);
  }

  private _onMouseDown(event: any) {
    const target = event.target;
    if (target) {
      this._activeObject = target;
      EditorStore.setActiveObject(target);
    }
    else {
      this._activeObject = null;
      EditorStore.setActiveObject(null);
    }
  }

  public dispose(): void {
    super.dispose();
    this._canvas.off(this._canvasEvent);
    this._activeObject = null;
  }

}
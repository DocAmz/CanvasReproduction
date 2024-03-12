import * as fabric from 'fabric';
import EditorStore from '../stores/EditorStore';

class ObjectBuilder {
  private canvas: fabric.Canvas | null;
  private DEFAULT_PLACEHOLDER = 'click to edit';
  private DEFAULT_FONT_SIZE = 20;
  private DEFAULT_PROPS = {
    opacity: 1,
    originX: 'center',
    originY: 'center',
    hasControls: true,
    hasBorders: true,
    cornerStyle: 'circle',
    transparentCorners: false,
  };

  constructor() {
    this.canvas = EditorStore.canvas ? EditorStore.canvas : null;
  }

  public createText = () => {
    const defaultOptions = {
      ...this.DEFAULT_PROPS,
      fontSize: this.DEFAULT_FONT_SIZE,
      fill: '#000',
      text: this.DEFAULT_PLACEHOLDER,
    };
    const text = new fabric.Textbox(defaultOptions.text, defaultOptions);
    this.add(text);
  };

  public createImage = async (url: string) => {
    const defaultOptions = {
      ...this.DEFAULT_PROPS,
      scaleX: 1,
      scaleY: 1,
      src: url,
    };
    const img = await fabric.Image.fromURL(url, {});
    img.set({...defaultOptions})

    this.add(img);
  }

  public createSvgElement = async (url: string) => {
    const canvas = this.canvas;
    fabric.loadSVGFromURL(url).then((res: any) => {
      const g = new fabric.Group(res.objects, {...res.opts, top: 0, left: 0});
      canvas?.add(g);
      canvas?.requestRenderAll();
    })
  }

  private add = (object: fabric.Object) => {
    if(!this.canvas) return
    this.canvas.add(object);
  }
}

export default ObjectBuilder;
/* eslint-disable import/no-anonymous-default-export */
import * as fabric from 'fabric'
import { makeAutoObservable } from 'mobx'


class EditorStore {
  canvas: fabric.Canvas | null = null
  activeObject: fabric.Object | null = null
  jsonData: string | null = null
  jsonUrl: string | null = null
  zoom: number = 1
  modelWidth: number = 1003.9370078740158
  modelHeight: number = 649.6062992125985
  clip: number = 2
  safe: number = 2
  diagonal: number = 15
  modelOrigin: number[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas: fabric.Canvas) {
    this.canvas = canvas
  }

  setActiveObject(object: fabric.Object | null) {
    this.activeObject = object
    console.log(this.activeObject)
  }
  setJsonData(data: string) {
    this.jsonData = data
  }
  setJsonUrl(url: string) {
    this.jsonUrl = url
  }
  setZoom(zoom: number) {
    this.zoom = zoom
  }
  setModelWidth(width: number) {
    this.modelWidth = width
  }
  setModelHeight(height: number) {
    this.modelHeight = height
  }
  setClip(clip: number) {
    this.clip = clip
  }
  setSafe(safe: number) {
    this.safe = safe
  }
  setDiagonal(diagonal: number) {
    this.diagonal = diagonal
  }
  setModelOrigin(origin: number[]) {
    this.modelOrigin = origin
  }

}

export default new EditorStore()
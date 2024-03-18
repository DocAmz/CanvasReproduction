/* eslint-disable import/no-anonymous-default-export */
import { makeAutoObservable } from "mobx"

class PdfDisplay {
  isDisplay: boolean = false

  constructor () {
    makeAutoObservable(this)
  }

  setDisplay = (value: boolean) => {
    this.isDisplay = value
  }

}

export default new PdfDisplay()
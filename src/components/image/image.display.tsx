/* eslint-disable import/no-anonymous-default-export */
import { makeAutoObservable } from "mobx"

class ImageDiplay {
  isDisplay: boolean = false

  constructor () {
    makeAutoObservable(this)
  }

  setDisplay = (value: boolean) => {
    this.isDisplay = value
  }

}

export default new ImageDiplay()
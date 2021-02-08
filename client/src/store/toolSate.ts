import {makeAutoObservable} from "mobx";

class ToolState {
  tool: any = null;
  strokeColor: string = "#000"
  fillColor: string = "#000"
  lineWidth: number = 1

  constructor() {
    makeAutoObservable(this)
  }

  setTool: (tool: any) => void = (tool) => {
    this.tool = tool;
  }

  setFillColor: (color: string) => void = (color) => {
    if (!this.tool) return;
    this.fillColor = color;
    this.tool.setFillColor(color)
  }

  setStrokeColor: (color: string) => void = (color) => {
    if (!this.tool) return;
    this.strokeColor = color;
    this.tool.setStrokeColor(color)
  }

  setLineWidth: (width: number) => void = (width) => {
    if (!this.tool || width < 1 || width > 50) return;
    this.lineWidth = width;
    this.tool.setLineWidth(width);
  }

}

export default new ToolState();
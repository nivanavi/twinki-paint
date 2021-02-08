import {makeAutoObservable} from "mobx";

class ToolState {
  tool: any = null;
  constructor() {
    makeAutoObservable(this)
  }

  setTool: (tool: any) => void = (tool) => {
    this.tool = tool;
  }

  setFillColor: (color: string) => void = (color) => {
    if (!this.tool) return;
    this.tool.setFillColor(color)
  }

  setStrokeColor: (color: string) => void = (color) => {
    if (!this.tool) return;
    this.tool.setStrokeColor(color)
  }

  setLineWidth: (width: number) => void = (width) => {
    if (!this.tool || width < 1 || width > 50) return;
    this.tool.setLineWidth(width);
  }

}

export default new ToolState();
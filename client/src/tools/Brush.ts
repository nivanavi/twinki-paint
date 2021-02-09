import Tool        from "./Tool";
import toolSate    from "../store/toolSate";
import canvasState from "../store/canvasState";

export default class Brush extends Tool {
  mouseDown: boolean = false;

  constructor(canvas, socket, sessionId) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  listen() {
    if (!this.canvas) return;
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    this.finishDraw();
  }

  mouseLeaveHandler() {
    this.mouseDown = false;
  }


  mouseDownHandler(ev: MouseEvent) {
    this.mouseDown = true;
    const {target, pageX, pageY} = ev;
    const {offsetLeft, offsetTop} = target as HTMLCanvasElement;
    if (!this.canvasContext) return;
    this.canvasContext.moveTo(pageX - offsetLeft, pageY - offsetTop);
    (this.canvasContext as any)[`prevX${canvasState.username}`] = pageX - offsetLeft;
    (this.canvasContext as any)[`prevY${canvasState.username}`] = pageY - offsetTop;
  }

  mouseMoveHandler(ev: MouseEvent) {
    if (!this.mouseDown || !this.canvasContext) return;
    const {target, pageX, pageY} = ev;
    const {offsetLeft, offsetTop} = target as HTMLCanvasElement;
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.sessionId,
      figure: {
        x: pageX - offsetLeft,
        y: pageY - offsetTop,
        prevX: (this.canvasContext as any)[`prevX${canvasState.username}`],
        prevY: (this.canvasContext as any)[`prevY${canvasState.username}`],
        username: canvasState.username,
        strokeColor: this.canvasContext.strokeStyle,
        lineWidth: this.canvasContext.lineWidth,
        type: "brush"
      }
    }))
  }

  static draw({
                canvasContext,
                x,
                y,
    prevX,
    prevY,
    username,
                strokeColor,
                lineWidth
              }: { canvasContext: any, x: number, y: number, username: string, prevX: number, prevY: number, strokeColor: string, lineWidth: number }) {
    canvasContext.beginPath();
    canvasContext.moveTo(prevX, prevY);
    canvasContext[`prevX${username}`] = x;
    canvasContext[`prevY${username}`] = y;
    canvasContext.lineTo(x, y);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineWidth = lineWidth;
    canvasContext.stroke();
    canvasContext.strokeStyle = toolSate.strokeColor;
    canvasContext.lineWidth = toolSate.lineWidth;
  }
}
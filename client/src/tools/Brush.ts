import Tool from "./Tool";

export default class Brush extends Tool {
  mouseDown: boolean = false;

  constructor(canvas, socket, sessionId, username) {
    super(canvas, socket, sessionId, username);
    this.listen();
  }

  listen () {
    if (!this.canvas) return;
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this);
  }

  mouseUpHandler () {
    this.mouseDown = false;
    this.finishDraw();
  }

  mouseLeaveHandler() {
    this.mouseDown = false;
  }


  mouseDownHandler (ev: MouseEvent) {
    this.mouseDown = true;
    const {target, pageX, pageY} = ev;
    const {offsetLeft, offsetTop} = target as HTMLCanvasElement;
    if (!this.canvasContext) return;
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(pageX - offsetLeft, pageY - offsetTop)
  }

  mouseMoveHandler (ev: MouseEvent) {
    if (!this.mouseDown || !this.canvasContext) return;
    const {target, pageX, pageY} = ev;
    const {offsetLeft, offsetTop} = target as HTMLCanvasElement;
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.sessionId,
      figure: {
        x: pageX - offsetLeft,
        y: pageY - offsetTop,
        strokeColor: this.canvasContext.strokeStyle,
        lineWidth: this.canvasContext.lineWidth,
        username: this.username,
        type: "brush"
      }
    }))
  }

  static draw (canvasContext: CanvasRenderingContext2D, x: number, y: number, strokeColor: string, lineWidth: number, currentUsername: string, requestUsername: string) {
    if (currentUsername !== requestUsername) return;
    canvasContext.lineTo(x, y);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineWidth = lineWidth;
    canvasContext.stroke();
  }
}
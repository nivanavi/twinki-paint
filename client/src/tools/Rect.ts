import Tool     from "./Tool";
import toolSate from "../store/toolSate";

export default class Rect extends Tool {
  mouseDown: boolean = false;
  startX: number = 0;
  startY: number = 0;
  height: number = 0;
  width: number = 0;
  canvasImg: any = null;

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

  mouseLeaveHandler() {
    this.mouseDown = false;
  }


  mouseUpHandler() {
    this.mouseDown = false;
    if (!this.canvasContext) return;
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.sessionId,
      figure: {
        x: this.startX,
        y: this.startY,
        height: this.height,
        weight: this.width,
        strokeColor: this.canvasContext.strokeStyle,
        fillColor: this.canvasContext.fillStyle,
        type: "rect"
      }
    }))
    this.finishDraw();
  }

  mouseDownHandler(ev: MouseEvent) {
    this.mouseDown = true;
    const {target, pageX, pageY} = ev;
    const {offsetLeft, offsetTop} = target as HTMLCanvasElement;
    if (!this.canvasContext || !this.canvas) return;
    this.startX = pageX - offsetLeft;
    this.startY = pageY - offsetTop;
    this.canvasImg = this.canvas.toDataURL();
  }

  mouseMoveHandler(ev: MouseEvent) {
    if (!this.mouseDown) return;
    const {target, pageX, pageY} = ev;
    const {offsetLeft, offsetTop} = target as HTMLCanvasElement;
    const currentX: number = pageX - offsetLeft;
    const currentY: number = pageY - offsetTop;
    this.height = currentX - this.startX;
    this.width = currentY - this.startY;
    this.draw(this.startX, this.startY, this.height, this.width);
  }

  draw(x: number, y: number, h: number, w: number) {
    if (!this.canvasContext || !this.canvas) return;
    const image = new Image();
    image.src = this.canvasImg;
    image.onload = () => {
      if (!this.canvasContext || !this.canvas) return;
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.canvasContext.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
      this.canvasContext.beginPath();
      this.canvasContext.rect(x, y, h, w);
      this.canvasContext.stroke();
      this.canvasContext.fill();
    }
  }

  static staticDraw({canvasContext, x, y, height, strokeColor, fillColor, weight} : {canvasContext, x: number, y: number, height: number, weight: number, strokeColor: string, fillColor: string}) {
    if (!canvasContext) return;
    canvasContext.rect(x, y, height, weight);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.fillStyle = fillColor;
    canvasContext.stroke();
    canvasContext.fill();
    canvasContext.strokeStyle = toolSate.strokeColor;
    canvasContext.fillStyle = toolSate.fillColor;
  }
}
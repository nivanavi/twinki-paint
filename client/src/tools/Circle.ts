import Tool from "./Tool";

export default class Circle extends Tool {
  mouseDown: boolean = false;
  startX: number = 0;
  startY: number = 0;
  radius: number = 0;
  canvasImg: any = null;

  constructor(canvas, socket, sessionId, username) {
    super(canvas, socket, sessionId, username);
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
    if (!this.canvasContext) return;
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.sessionId,
      figure: {
        x: this.startX,
        y: this.startY,
        radius: this.radius,
        strokeColor: this.canvasContext.strokeStyle,
        fillColor: this.canvasContext.fillStyle,
        type: "circle"
      }
    }))
    this.finishDraw();
  }

  mouseLeaveHandler() {
    this.mouseDown = false;
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
    const height: number = currentX - this.startX;
    const width: number = currentY - this.startY;
    this.radius = Math.sqrt(height * height + width * width)
    this.draw(this.startX, this.startY, this.radius);
  }

  draw(x: number, y: number, radius: number) {
    if (!this.canvasContext || !this.canvas) return;
    const image = new Image();
    image.src = this.canvasImg;
    image.onload = () => {
      if (!this.canvasContext || !this.canvas) return;
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.canvasContext.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
      this.canvasContext.beginPath();
      this.canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
      this.canvasContext.stroke();
      this.canvasContext.fill();
    }
  }

  static staticDraw(canvasContext: CanvasRenderingContext2D, x: number, y: number, radius: number, strokeColor: string, fillColor: string, currentUsername: string, requestUsername: string) {

    if (!canvasContext || currentUsername !== requestUsername) return;
    canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.fillStyle = fillColor;
    canvasContext.stroke();
    canvasContext.fill();
  }
}
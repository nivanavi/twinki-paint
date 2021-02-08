import Tool from "./Tool";

export default class Line extends Tool {
  mouseDown: boolean = false;
  currentX: number = 0;
  currentY: number = 0;
  startX: number = 0;
  startY: number = 0;
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

  mouseUpHandler() {
    this.mouseDown = false;
    if (!this.canvasContext) return;
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.sessionId,
      figure: {
        currentX: this.currentX,
        currentY: this.currentY,
        x: this.startX,
        y: this.startY,
        strokeColor: this.canvasContext.strokeStyle,
        lineWidth: this.canvasContext.lineWidth,
        type: "line"
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
    this.canvasContext.beginPath()
    this.canvasContext.moveTo(this.startX, this.startY)
    this.canvasImg = this.canvas.toDataURL()
  }

  mouseMoveHandler(ev: MouseEvent) {
    if (!this.mouseDown || !this.canvasContext || !this.canvas) return;
    const {target, pageX, pageY} = ev;
    const {offsetLeft, offsetTop} = target as HTMLCanvasElement;
    this.currentX = pageX - offsetLeft;
    this.currentY = pageY - offsetTop;
    this.draw(pageX - offsetLeft, pageY - offsetTop)
  }

  mouseLeaveHandler() {
    this.mouseDown = false;
  }

  draw(x: number, y: number) {
    if (!this.canvasContext || !this.canvas) return;
    const image = new Image();
    image.src = this.canvasImg;
    image.onload = () => {
      if (!this.canvasContext || !this.canvas) return;
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.canvasContext.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(this.startX, this.startY)
      this.canvasContext.lineTo(x, y)
      this.canvasContext.stroke()
    }
  }

  static staticDraw(canvasContext: CanvasRenderingContext2D, currentX: number, currentY: number, x: number, y: number, strokeColor: string, lineWidth: number) {
    if (!canvasContext) return;
    canvasContext.moveTo(currentX, currentY)
    canvasContext.lineTo(x, y)
    canvasContext.lineWidth = lineWidth;
    canvasContext.strokeStyle = strokeColor;
    canvasContext.stroke()
  }
}
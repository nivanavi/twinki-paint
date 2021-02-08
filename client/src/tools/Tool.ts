export default class Tool {
  canvas: HTMLCanvasElement | null = null
  canvasContext: CanvasRenderingContext2D | null = null;
  socket: any = null
  sessionId: string | undefined = undefined

  constructor(canvas: HTMLCanvasElement, socket: any, sessionId: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.sessionId = sessionId;
    this.canvasContext = canvas.getContext('2d');
    this.destroyEvents();
  }

  setFillColor: (color: string) => void = (color: string) => {
    if (!this.canvasContext) return;
    this.canvasContext.fillStyle = color
  }

  setStrokeColor: (color: string) => void = (color: string) => {
    if (!this.canvasContext) return;
    this.canvasContext.strokeStyle = color
  }

  setLineWidth: (width: number) => void = (width) => {
    if (!this.canvasContext) return;
    this.canvasContext.lineWidth = width;
  }

  destroyEvents() {
    if (!this.canvas) return
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseleave = null;
  }

  finishDraw() {
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.sessionId,
      figure: {
        type: "end"
      }
    }))
  }
}
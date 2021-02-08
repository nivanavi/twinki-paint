import {makeAutoObservable} from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  undoList: any[] = [];
  redoList: any[] = [];
  username: string | undefined = undefined
  socket: any = null
  sessionId: string | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas: (canvasEl: HTMLCanvasElement | null) => void = (canvas) => {
    if (!canvas) return;
    this.canvas = canvas;
  }

  setUsername: (username: string) => void = (username) => {
    this.username = username;
  }

  setSocket: (socket: any) => void = (socket) => {
    this.socket = socket;
  }

  setSessionId: (sessionId: string) => void = (sessionId) => {
    this.sessionId = sessionId;
  }

  addToUndo: (item: any) => void = (item) => {
    this.undoList.push(item)
  }

  addToRedo: (item: any) => void = (item) => {
    this.redoList.push(item)
  }

  undoRedo: (data: string) => void = (data) => {
    if (!this.canvas) return;
    const canvasContext = this.canvas.getContext('2d');
    if (!canvasContext) return;
    const image = new Image();
    image.src = data;
    image.onload = () => {
      if (!canvasContext || !this.canvas) return;
      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
      canvasContext.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
    }
  }

  undoRedoSend: (dataUrl: string) => void = (dataUrl: string) => {
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.sessionId,
      figure: {
        dataUrl,
        type: "undoRedo"
      }
    }))
  }

  undo: () => void = () => {
    if (!this.canvas) return;
    const canvasContext = this.canvas.getContext('2d');
    if (!canvasContext) return;
    if (this.undoList.length === 0) return canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const dataUrl = this.undoList.pop();
    this.addToRedo(this.canvas.toDataURL());
    this.undoRedoSend(dataUrl);
    const image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      if (!canvasContext || !this.canvas) return;
      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
      canvasContext.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
    }
  }

  redo: () => void = () => {
    if (!this.canvas) return;
    const canvasContext = this.canvas.getContext('2d');
    if (!canvasContext) return;
    if (this.redoList.length === 0) return;
    const dataUrl = this.redoList.pop();
    this.addToUndo(this.canvas.toDataURL());
    this.undoRedoSend(dataUrl);
    const image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      if (!canvasContext || !this.canvas) return;
      canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
      canvasContext.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
    }
  }

}


export default new CanvasState();
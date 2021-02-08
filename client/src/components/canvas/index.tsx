import React          from 'react';
import {StyledCanvas} from "./styles";
import canvasState    from '../../store/canvasState'
import toolState      from '../../store/toolSate'
import Brush          from "../../tools/Brush";
import {observer}     from "mobx-react-lite";
import UsernameModal  from "../usernameModal";
import {useParams}    from 'react-router-dom'
import Rect           from "../../tools/Rect";
import Eraser         from "../../tools/Eraser";
import Circle         from "../../tools/Circle";
import Line           from "../../tools/Line";
import axios          from 'axios';

const PORT: string | undefined = process.env.PORT || "1337";
const ADDRESS: string = "176.99.11.14";

export const Canvas = observer(() => {
  const {id}: any = useParams();
  const canvasRef: { current: null | HTMLCanvasElement } = React.useRef(null);
  const [stateUsernameModal, setUsernameModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvasContext = canvasRef.current.getContext('2d');
    if (!canvasContext) return;
    canvasState.setCanvas(canvasRef.current)
    const {width, height} = canvasRef.current;
    axios.get(`http://${ADDRESS}:${PORT}/image?id=${id}`)
      .then(response => {
        const img = new Image()
        img.src = response.data
        img.onload = () => {
          canvasContext.clearRect(0, 0, width, height)
          canvasContext.drawImage(img, 0, 0, width, height)
        }
      })
      .catch(error => console.log(error))
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) return canvasState.setUsername(username);
    setUsernameModal(true);
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (!canvasState.username) return;
    const socket = new WebSocket(`ws://${ADDRESS}:${PORT}/`);
    canvasState.setSocket(socket);
    canvasState.setSessionId(id);
    toolState.setTool(new Brush(canvasRef.current, socket, id))
    socket.onopen = () => {
      socket.send((JSON.stringify({
        method: "connection",
        id,
        username: canvasState.username
      })))
    }
    socket.onmessage = ({data}) => {
      if (!data) return;
      const parseData = JSON.parse(data);
      switch (parseData.method) {
        case 'connection':
          console.log(`User ${parseData.username} connected`)
          break;
        case 'draw':
          drawHandler(parseData);
          break;
      }
    }
    // eslint-disable-next-line
  }, [canvasState.username]);

  const mouseDownHandler = () => {
    if (!canvasRef.current) return;
    canvasState.addToUndo(canvasRef.current.toDataURL())
  }

  const mouseUpHandler = () => {
    if (!canvasRef.current) return;
    axios.post(`http://${ADDRESS}:${PORT}/image?id=${id}`, {img: canvasRef.current.toDataURL()})
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }

  const drawHandler = (data) => {
    if (!canvasRef.current) return;
    const {figure} = data;
    console.log("figure", figure)
    const canvasContext = canvasRef.current.getContext('2d');
    if (!canvasContext || !canvasState.sessionId) return;
    switch (figure.type) {
      case "brush":
        Brush.draw(canvasContext, figure.x, figure.y, figure.strokeColor, figure.lineWidth, canvasState.sessionId, figure.sessionId);
        break;
      case "rect":
        Rect.staticDraw(canvasContext, figure.x, figure.y, figure.height, figure.weight, figure.strokeColor, figure.fillColor);
        break;
      case "eraser":
        Eraser.draw(canvasContext, figure.x, figure.y, figure.lineWidth);
        break;
      case "circle":
        Circle.staticDraw(canvasContext, figure.x, figure.y, figure.radius, figure.strokeColor, figure.fillColor);
        break;
      case "line":
        Line.staticDraw(canvasContext, figure.currentX, figure.currentY, figure.x, figure.y, figure.strokeColor, figure.lineWidth);
        break;
      case "undoRedo":
        canvasState.undoRedo(figure.dataUrl);
        break;
      case "end":
        canvasContext.beginPath();
        break;
    }
  }

  return (
    <StyledCanvas>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        onMouseUp={() => mouseUpHandler()}
        ref={canvasRef}
        width={600}
        height={500}
      />
      <UsernameModal isOpen={stateUsernameModal} header="Введите свой никнейм" onClose={() => setUsernameModal(false)}/>
    </StyledCanvas>
  );
});

export default Canvas;
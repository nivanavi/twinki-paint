import React          from 'react';
import {StyledCanvas} from "./styles";
import canvasState       from '../../store/canvasState'
import toolState         from '../../store/toolSate'
import Brush             from "../../tools/Brush";
import {observer}        from "mobx-react-lite";
import UsernameModal     from "../usernameModal";
import {useParams}       from 'react-router-dom'
import Rect              from "../../tools/Rect";
import Eraser            from "../../tools/Eraser";
import Circle            from "../../tools/Circle";
import Line              from "../../tools/Line";
import notificationState from "../../store/notificationState";

const PORT: string | undefined = process.env.REACT_APP_PORT;
const ADDRESS: string | undefined = process.env.REACT_APP_ADDRESS;

export const Canvas = observer(() => {
  const {id}: any = useParams();
  const canvasRef: { current: null | HTMLCanvasElement } = React.useRef(null);
  const [stateUsernameModal, setUsernameModal] = React.useState<boolean>(false);
  const [stateCanvasArea, setCanvasArea] = React.useState<{ height: number, width: number, isAreaSet: boolean }>({
    height: 0,
    width: 0,
    isAreaSet: false
  });

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) return canvasState.setUsername(username);
    setUsernameModal(true);
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (!canvasRef.current) return;
    setCanvasArea({
      height: window.innerHeight - canvasRef.current.offsetTop,
      width: window.innerWidth,
      isAreaSet: true
    })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (!canvasState.username || !stateCanvasArea.isAreaSet || !canvasRef.current) return;
    const socket = new WebSocket(`ws://${ADDRESS}:${PORT}/`);
    canvasState.setCanvas(canvasRef.current);
    canvasState.setSocket(socket);
    canvasState.setSessionId(id);
    toolState.setTool(new Brush(canvasRef.current, socket, id))
    canvasState.setDefaultImage();
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
          if (canvasState.username === parseData.username) return;
          notificationState.addNotification({type: "success", text: `К вам подключился ${parseData.username}`})
          break;
        case 'draw':
          drawHandler(parseData);
          break;
      }
    }
    // eslint-disable-next-line
  }, [canvasState.username, stateCanvasArea.isAreaSet]);

  const mouseDownHandler = () => {
    if (!canvasRef.current) return;
    canvasState.addToUndo(canvasRef.current.toDataURL())
  }

  const mouseUpHandler = () => {
    // console.log(canvasRef.current)
    // if (!canvasRef.current) return;
    canvasState.saveImage();
  }

  const drawHandler = (data) => {
    if (!canvasRef.current) return;
    const {figure} = data;
    console.log("figure", figure)
    const canvasContext = canvasRef.current.getContext('2d');
    if (!canvasContext || !canvasState.username) return;
    switch (figure.type) {
      case "brush":
        Brush.draw({canvasContext, ...figure});
        break;
      case "rect":
        Rect.staticDraw({canvasContext, ...figure});
        break;
      case "eraser":
        Eraser.draw({canvasContext, ...figure});
        break;
      case "circle":
        Circle.staticDraw({canvasContext, ...figure});
        break;
      case "line":
        Line.staticDraw({canvasContext, ...figure});
        break;
      case "undoRedo":
        canvasState.undoRedo(figure.dataUrl);
        break;
      case "clear":
        canvasState.clearAll();
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
        width={stateCanvasArea.width}
        height={stateCanvasArea.height}
      />
      <UsernameModal isOpen={stateUsernameModal} header="Введите свой никнейм" onClose={() => setUsernameModal(false)}/>
    </StyledCanvas>
  );
});

export default Canvas;
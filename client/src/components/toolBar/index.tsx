import React           from 'react';
import {StyledToolBar} from "./styles";
import toolState       from '../../store/toolSate';
import canvasState     from '../../store/canvasState';
import Rect            from "../../tools/Rect";
import Brush           from "../../tools/Brush";
import Circle          from "../../tools/Circle";
import Line            from "../../tools/Line";
import Eraser          from "../../tools/Eraser";

export const ToolBar = () => {
  return (
    <StyledToolBar>
      <button onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>кисть</button>
      <button onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>прямоугольник</button>
      <button onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>круг</button>
      <button onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>ластик</button>
      <button onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}>линия</button>
      <button onClick={() => canvasState.redo()}>отменить</button>
      <button onClick={() => canvasState.undo()}>вернуть</button>
      <button onClick={() => canvasState.clearAll()}>очистить все</button>
    </StyledToolBar>
  );
};

export default ToolBar;
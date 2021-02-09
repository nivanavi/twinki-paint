import React                                                                           from 'react';
import {StyledInput, StyledLineWidth, StyledLogo, StyledToolBar, StyledToolBarWrapper} from "./styles";
import toolState                                                                       from '../../store/toolSate';
import canvasState                                                                     from '../../store/canvasState';
import Rect                                                                            from "../../tools/Rect";
import Brush                                                                           from "../../tools/Brush";
import Circle                                                                          from "../../tools/Circle";
import Line                                                                            from "../../tools/Line";
import Eraser                                                                          from "../../tools/Eraser";
import Button                                                                          from "../button/button";
import {PencilIcon}                                                                    from "../../icons/ui/Pencil";
import {CircleIcon}     from "../../icons/ui/Ellipse";
import {RectIcon}        from "../../icons/ui/Rect";
import {LineIcon}        from "../../icons/ui/Line";
import {ReloadIcon}      from "../../icons/ui/Reload";
import {TrashIcon}       from "../../icons/ui/Trash";
import {SaveFileIcon}    from "../../icons/ui/SaveFile";
import {PanelOpenIcon}   from "../../icons/ui/PanelOpen";
import {TextButton}      from "../globalStyledComponents";
import {PanelCloseIcon}  from "../../icons/ui/PanelClose";
import {observer}        from "mobx-react-lite";
import logo              from '../../icons/logo/logo.png'
import { useHistory } from 'react-router-dom';
import notificationState from "../../store/notificationState";

const PORT: string | undefined = process.env.REACT_APP_PORT;
const ADDRESS: string | undefined = process.env.REACT_APP_ADDRESS;


export const ToolBar = observer(() => {
  const {location: {pathname}} = useHistory();
  const saveImgHandler = () => {
    if (!canvasState.canvas) return;
    const link = document.createElement("a");
    link.setAttribute('download', `${canvasState.sessionId}.jpg`);
    link.setAttribute('href', canvasState.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const increaseLineWidth = () => {
    toolState.setLineWidth(toolState.lineWidth + 1);
  }

  const decreaseLineWidth = () => {
    toolState.setLineWidth(toolState.lineWidth - 1);
  }

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(`http://${ADDRESS}:3000${pathname}`);
    notificationState.addNotification({type: "success", text: "Ссылка скопирована в буфер обмена"})
  }

  return (
    <StyledToolBarWrapper>
      <StyledLogo>
        <img src={logo} alt="logo nivanavi"/>
      </StyledLogo>
      <StyledToolBar>
        <Button appearance="flag" tooltip="Карандаш" icon={<PencilIcon direction="top"/>}
                onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
        <Button appearance="flag" tooltip="Ластик" icon={<PencilIcon direction="down"/>}
                onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
        <Button appearance="flag" tooltip="Прямоугольник" icon={<RectIcon/>}
                onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
        <Button appearance="flag" tooltip="Круг" icon={<CircleIcon/>}
                onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
        <Button appearance="flag" tooltip="Прямая линия" icon={<LineIcon/>}
                onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
        <Button appearance="flag" tooltip="Вернуть" icon={<ReloadIcon direction="left"/>}
                onClick={() => canvasState.redo()}/>
        <Button appearance="flag" tooltip="Отменить" icon={<ReloadIcon direction="right"/>}
                onClick={() => canvasState.undo()}/>
        <Button appearance="flag" tooltip="Очистить" icon={<TrashIcon/>} onClick={() => canvasState.clearAllSend()}/>

        <Button appearance="flag" tooltip="Цвет обводки / цвет линии"
                icon={<StyledInput type="color" onChange={({target: {value}}) => toolState.setStrokeColor(value)}/>}/>
        <Button appearance="flag" tooltip="Цвет заливки"
                icon={<StyledInput type="color" onChange={({target: {value}}) => toolState.setFillColor(value)}/>}/>
        <StyledLineWidth>
          <Button tooltip="Уменьшить толщину линии" appearance="icon" onClick={() => decreaseLineWidth()}
                  icon={<PanelOpenIcon/>}/>
          <TextButton>{toolState.lineWidth}</TextButton>
          <Button tooltip="Увеличить толщину линии" appearance="icon" onClick={() => increaseLineWidth()}
                  icon={<PanelCloseIcon/>}/>
          <Button
            appearance="link"
            onClick={() => copyLinkHandler()}
            tooltip="Копировать ссылку для друга"
          >
            Ссылка для друга
          </Button>
        </StyledLineWidth>
      </StyledToolBar>
      <Button appearance="flag" tooltip="Сохранить" icon={<SaveFileIcon/>} onClick={() => saveImgHandler()}/>
    </StyledToolBarWrapper>
  );
});

export default ToolBar;
import React              from 'react';
import {StyledSettingBar} from "./styles";
import toolState       from '../../store/toolSate';

export const SettingBar = () => {
    return (
        <StyledSettingBar>
            <input type="color" onChange={({target: {value}}) => toolState.setFillColor(value)}/>
            <input type="color" onChange={({target: {value}}) => toolState.setStrokeColor(value)}/>
            <input type="number" onChange={({target: {value}}) => toolState.setLineWidth(Number(value))}/>
        </StyledSettingBar>
    );
};

export default SettingBar;
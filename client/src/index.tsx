import React                from 'react';
import ReactDOM             from 'react-dom';
import {StyledPaintWrapper} from "./styles";
import ToolBar              from "./components/toolBar";
import SettingBar           from "./components/settingBar";
import Canvas               from "./components/canvas";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <StyledPaintWrapper>
        <Switch>
          <Route path="/:id">
            <ToolBar/>
            <SettingBar/>
            <Canvas/>
          </Route>
          <Redirect to={`/nivanavi${new Date().valueOf()}`}/>
        </Switch>
      </StyledPaintWrapper>
    </BrowserRouter>
  );
}

ReactDOM.render(<App/>, document.getElementById('root')  as HTMLElement);

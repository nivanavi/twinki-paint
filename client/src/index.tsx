import React                                    from 'react';
import ReactDOM                                 from 'react-dom';
import {StyledPaintWrapper}                     from "./styles";
import ToolBar                                  from "./components/toolBar";
import Canvas                                   from "./components/canvas";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Notifications                            from "./components/notification";

const App = () => {
  return (
    <BrowserRouter>
      <StyledPaintWrapper>
        <Switch>
          <Route path="/:id">
            <ToolBar/>
            <Canvas/>
          </Route>
          <Redirect to={`/nivanavi${new Date().valueOf()}`}/>
        </Switch>
        <Notifications/>
      </StyledPaintWrapper>
    </BrowserRouter>
  );
}

ReactDOM.render(<App/>, document.getElementById('root')  as HTMLElement);

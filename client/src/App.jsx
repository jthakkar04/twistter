import React from "react";
import "./styles/App.scss";
import { Login } from "./components/login/index";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
          <Login containerRef={ref => (this.current = ref)} />
            {/* {!isLogginActive && ( */}
              {/* <Register containerRef={ref => (this.current = ref)} /> */}
            {/* )} */}
          </div>
          {/* <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          /> */}
        </div>
      </div>
    );
  }
}

export default App;
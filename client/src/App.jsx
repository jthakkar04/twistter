import React from "react";
import "./styles/App.scss";
import { Login } from "./components/login/index";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLogginActive: true
  //   };
  // }

  // changeState() {
  //   const { isLogginActive } = this.state;
  //   this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  // }

  render() {
    // const { isLogginActive } = this.state;
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {/* {isLogginActive && ( */}
              <Login containerRef={ref => (this.current = ref)} />
            {/* )} */}
            {/* {!isLogginActive && ( */}
              {/* <Register containerRef={ref => (this.current = ref)} /> */}
            {/* )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
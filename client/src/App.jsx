import React from "react";
import "./styles/App.scss";
import { Login } from "./components/login/index";
import { Registration } from "./components/registration/index";

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
      <div className="App"> {/* the whole thing which is declared in app.scss*/}
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {/* {isLogginActive && ( */}
            {/* <Login containerRef={ref => (this.current = ref)} /> */}
            {/* )} */}
            {/* {!isLogginActive && ( */}
            <Registration containerRef={ref => (this.current = ref)} />
            {/* )} */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

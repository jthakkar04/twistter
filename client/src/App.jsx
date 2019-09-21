import React from "react";
import "./styles/App.scss";
import { Login } from "./components/login/index";
import { Registration } from "./components/registration/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  changeState() {
    const { isLogginActive } = this.state;

    // if (isLogginActive) {
    //   this.rightSide.classList.remove("right");
    //   this.rightSide.classList.add("left");
    // } else {
    //   this.rightSide.classList.remove("left");
    //   this.rightSide.classList.add("right");
    // }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Registration containerRef={ref => (this.current = ref)} />
            )}
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

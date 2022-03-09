import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMobile: false,
        prevWidth: '',
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount = async () => {
      this.setState({ prevWidth: window.innerWidth }, () => { 
          this.updatePredicate(); 
      });
      window.addEventListener("resize", this.updatePredicate);
  };

  componentWillUnmount() {
      window.removeEventListener("resize", this.updatePredicate);
  };

  updatePredicate() {
      let prevWidth = this.state.prevWidth;
      let mobileWidth = 770;
      if(window.innerWidth <= mobileWidth && prevWidth <= mobileWidth && this.state.isMobile) {
        this.setState({ mobileUpdated: true });
      } else if (window.innerWidth > mobileWidth && prevWidth >= mobileWidth &&  !this.state.isMobile) {
        this.setState({ mobileUpdated: false });
      } else {
        this.setState({ mobileUpdated: false });
      }
      this.setState({ 
        isMobile: window.innerWidth <= mobileWidth,
        prevWidth: window.innerWidth
      }, () => {
          // console.log(this.state.isMobile);
      });
  };

  render() {
      return (
          <>
          <div style={this.state.isMobile ? { "textAlign": "center", "paddingBottom":"16px", "minHeight":"60vh"} : { "textAlign": "center", "paddingBottom":"16px", "minHeight":"73vh" }}>
              <div>
                  <h2>Welcome</h2>
              </div>
              <div>
              </div>
              <div>
              </div>
          </div>
          </>
      );
  }
}

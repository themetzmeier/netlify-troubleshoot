import React, { Component } from "react";

export default class Footer extends Component {
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
            <div style={this.state.isMobile ? { "paddingTop": "16px", "paddingBottom": "16px", "paddingLeft":"16px", "paddingRight":"16px", "background":"Red", "textAlign":"center" } : {"paddingTop": "16px", "paddingBottom": "16px", "background":"Red", "display":"flex","justifyContent":"center" }}>
                <p style={{ "color": "white" }}>Content is available under <a style={{ "color": "white" }} href="https://creativecommons.org/licenses/by-nc-sa/2.5/">Attribution-NonCommercial-ShareAlike 2.5</a>.</p>
            </div>
        </>
    );
  }
}

import React, { Component } from "react";

export default class Error extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isMobile: false,
            prevWidth: '',
        };
        this.updatePredicate = this.updatePredicate.bind(this);
    }

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

    componentDidMount = async () => {
        this.setState({ prevWidth: window.innerWidth }, () => { 
            this.updatePredicate(); 
        });
        window.addEventListener("resize", this.updatePredicate);
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    };
  
    render() {
        return(
            <div style={this.state.isMobile ? { "textAlign":"center", "minHeight":"62vh", "paddingLeft": "32px", "paddingRight": "32px" } : { "textAlign":"center", "minHeight":"75vh" }}>
                <h2>Page Could Not be Found...</h2>
                <p>Please refresh the page and try searching again!</p>
            </div>
        );
    }
}

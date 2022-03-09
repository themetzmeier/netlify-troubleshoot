import React, { Component } from 'react';
import Axios from "axios";

export default class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataFetched: false,
            isMobile: false,
            prevWidth: '',
            mobileUpdated: '',
            response: '',
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
        let dataFetched = await this.fetchData();
        this.setState({
            dataFetched
        });
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    };

    fetchData = async () => {
        let slug = this.props.match.params.slug;
        let results = await this.searchName(slug);
        return results;
    };

    change = async (e) => {
        this.setState({
        [e.target.name]: e.target.value
        });
    };

    searchName = async (name) => {
        // const self = this;
        try {
            let response = '';
            if(process.env.REACT_APP_NODE_ENV === "production") {
                //For production use
                response = await Axios.post("/.netlify/functions/testFunction", [name]);
            } else {
                //For local testing use
                response = await Axios.post("http://localhost:3001/.netlify/functions/testFunction", [name]);
            }
            // console.log(response);

            if(response.status === 200) {
                this.setState({
                response: response.data
                });
            } else {
                //NEED ERROR HANDLING
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
        
    };
  
    render() {
        if(this.state.response && this.state.dataFetched) {
            return (
                <div style={{ "display":"flex", "justifyContent":"center", "marginLeft": "32px", "marginRight": "32px", "paddingBottom": "32px" }}>
                    <div style={this.state.isMobile ? {} : {"width":"50%"}}>        
                        <div style={{ "paddingLeft":"16px", "paddingRight":"16px" }}>
                            <div style={{ "width": "100%", "display": "flex", "justifyContent": "center" }}>
                                <h2>{this.state.response}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if(this.state.dataFetched) {
            return(
                <div style={this.state.isMobile ? { "textAlign":"center", "minHeight":"62vh", "paddingLeft": "32px", "paddingRight": "32px" } : { "textAlign":"center", "minHeight":"75vh" }}>
                    <h2>We're sorry</h2>
                    <p>This name could not be found! Please refresh the page and try searching again!</p>
                </div>
            );
        } else {
            return(
                <div style={this.state.isMobile ? { "textAlign":"center", "minHeight":"58vh", "paddingLeft": "32px", "paddingRight": "32px" } : { "textAlign":"center", "minHeight":"70vh" }}>
                    <h2 style={{ "marginTop":"64px" }}>Loading...</h2>
                </div>
            );
        }
    }
}

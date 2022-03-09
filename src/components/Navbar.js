import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        search: '',
    };
  }

  newUrl = (e) => {
      e.preventDefault();
      let url = `/test/${this.state.search}`
      window.location.assign(url);
  };

  change = async (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
  };

  render() {
      return (
          <nav style={{ "paddingTop": "16px", "paddingBottom":"16px", "width": "100%", "display": "flex", "justifyContent": "center", "alignContent":"center", "backgroundColor":"Red" }}>
              <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                  <form onSubmit={(e) => this.newUrl(e)}>
                    <input
                        style={{ "height":"25px", "borderRadius": "10px" }}
                        name="search"
                        placeholder="Name"
                        value={this.state.search}
                        onChange={(e) => this.change(e)}
                    />
                    <button style={{ "marginLeft": "8px", "height": "25px", "borderRadius": "30px", "background": "white", "cursor": "pointer" }} type="submit" >Search</button>
                  </form>
              </div>
          </nav>);
  }
}

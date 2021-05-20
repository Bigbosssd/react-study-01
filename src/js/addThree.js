import React from "react";
import ReactDOM from "react-dom";

class AddThree extends React.Component {
    constructor() {
        super();
        this.state = {
            num: 1,
        };
    }

    addThree() {
        this.setState({
            num: this.state.num + 1,
        });
        this.setState({
            num: this.state.num + 1,
        });
        this.setState({
            num: this.state.num + 1,
        });
    }

    render() {
        return (
            <div>
                <div>addThree: {this.state.num}</div>
                <button onClick={this.addThree}>add</button>
            </div>
        );
    }
}

ReactDOM.render(
    <AddThree/>,
    document.getElementById('addThree')
);
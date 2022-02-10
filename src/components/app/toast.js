import React  from 'react';
import {Toast as T, ToastContainer as TC} from "react-bootstrap"

class Toast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false ,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            "show": nextProps.show ?? false
        })
    }

    render() {
        return (
            <TC className={`bg-${this.props.type} m-3`} position="bottom-end" >
                <T show={this.state.show} onClose={()=> {this.setState({"show": false})}} delay={3000} autohide>
                    <T.Header>
                        <strong className="me-auto">{this.props.title}</strong>
                        <small>{new Date().toLocaleString()}</small>
                    </T.Header>
                    <T.Body>
                        {this.props.body}
                    </T.Body>
                </T>
            </TC>
        );
    }
}

export default Toast; 

import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";
import Aux from "../hoc/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.resInterceptor = axios.interceptors.response.use(
        (response) => response,
        (err) => {
          this.setState({ error: err });
        }
      );
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);

      axios.interceptors.request.eject(this.reqInterceptor);
    }
    errorConfig = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfig}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}></WrappedComponent>
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

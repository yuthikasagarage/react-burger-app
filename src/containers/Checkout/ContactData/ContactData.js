import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  //

  state = {
    orderForm: {
      name: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validations: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validations: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validations: {
          required: true,
          minLength: 5,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validations: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementtype: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validations: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementtype: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validations: {
          required: false,
        },
        touched: false,
      },
    },
    loading: false,
    formisValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};
    for (let formElementid in this.state.orderForm) {
      formData[formElementid] = this.state.orderForm[formElementid].value;
    }

    const order = {
      ingredients: this.props.ingredients_,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validations
    );

    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);

    let formisValid = true;
    for (let inputid in updatedOrderForm) {
      formisValid = updatedOrderForm[inputid].valid && formisValid;
    }

    this.setState({ orderForm: updatedOrderForm, formisValid: formisValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({ id: key, config: this.state.orderForm[key] });
    }

    //
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementtype}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validations.required}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formisValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;

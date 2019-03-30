import React, { Component } from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { setPaymentInfo } from "../../actions/paymentAction";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { CreditCard, Room } from "@material-ui/icons/";
import { CardElement, injectStripe } from "react-stripe-elements";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  cssLabel: {
    "&$cssFocused": {
      color: "#0c4b78"
    }
  }
});

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastName: "",
      email: "",
      address1: "",
      address2: "",
      city: "",
      aState: "",
      zip: "",
      country: "",
      nameOnCard: "",
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvv: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripeValidate = this.stripeValidate.bind(this);
  }

  stripeValidate(e) {
    console.log([e.complete]);
    this.setState({ paymentField: e.complete });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const paymentData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      address1: this.state.address1,
      address2: this.state.address2,
      email: this.state.email,
      city: this.state.city,
      aState: this.setState.aState,
      zip: this.state.zip,
      country: this.state.country,
      nameOnCard: this.state.nameOnCard,
      cardNumber: this.state.cardNumber,
      expMonth: this.state.expMonth,
      expYear: this.state.expYear,
      cvv: this.state.cvv
    };
    this.props.setPaymentInfo(paymentData);
    this.props.changeToConfirmation();
  }

  render() {
    const { individualHotelData } = this.props.individualHotelData;
    const query = this.props.query;
    const roomSelection = this.props.roomSelection;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid>
          <div style={{ marginLeft: "8%", marginTop: "5%" }}>
            <h3 className="PaymentSmallTitle">Your Stay at</h3>
            <h4 className="PaymentTitle">{individualHotelData.name}</h4>
          </div>

          <form onSubmit={this.onSubmit}>
            <Paper
              style={{ marginLeft: "8%", marginTop: "5%", marginRight: "5%" }}
            >
              <CardContent>
                <h4 style={{ marginTop: "1%" }}>Room 1:</h4>
                <hr />
                <TextField
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused
                    }
                  }}
                  label="First Name"
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
                <br />
                <br />
                <TextField
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused
                    }
                  }}
                  label="Last Name"
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
                {/* 
                <label for="firstname">
                  <i className="fa fa-user" /> First Name
                </label>
                <p style={{ fontSize: 14, color: "#808080" }}>
                  Please give us the name of one of the people staying in this
                  room.
                </p>
                <input
                  type="text"
                  id="sample-input"
                  name="firstname"
                  placeholder="John"
                  onChange={this.onChange}
                />
                <label for="lastname">
                  <i className="fa fa-user" /> Last Name
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="lastname"
                  placeholder="Doe"
                  onChange={this.onChange}
                /> */}
              </CardContent>
            </Paper>

            <Paper
              style={{ marginLeft: "8%", marginTop: "5%", marginRight: "5%" }}
            >
              <CardContent>
                <h4 style={{ marginTop: "1%" }}>Step 2: Your details</h4>
                <hr />
                <p style={{ fontSize: 14, color: "#808080" }}>
                  We’ll send your confirmation email to this address
                </p>
                <label for="email">
                  <i className="fa fa-envelope" /> Email
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="email"
                  placeholder="john@example.com"
                  onChange={this.onChange}
                />
                <label for="address1">
                  <Room /> Address 1
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="address1"
                  placeholder="542 W. 15th Street"
                  onChange={this.onChange}
                />
                <label for="address2">
                  <Room />
                  Address 2
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="address2"
                  placeholder="optional"
                  onChange={this.onChange}
                />
                <label for="city">
                  <i className="fa fa-institution" /> City
                </label>
                <input
                  type="text"
                  id="sample-input"
                  name="city"
                  placeholder="San Jose"
                  onChange={this.onChange}
                />
                <label for="aState">State</label>
                <input
                  type="text"
                  id="sample-input"
                  name="aState"
                  placeholder="CA"
                  onChange={this.onChange}
                />
                <label for="country">Country</label>
                <input
                  type="text"
                  id="sample-input"
                  name="country"
                  placeholder="USA"
                  onChange={this.onChange}
                />
                <label for="zip">Zip</label>
                <input
                  type="text"
                  id="sample-input"
                  name="zip"
                  placeholder="95111"
                  onChange={this.onChange}
                />
              </CardContent>
            </Paper>

            <Paper
              style={{ marginLeft: "8%", marginTop: "5%", marginRight: "5%" }}
            >
              <CardContent>
                <h4 style={{ marginTop: "1%" }}>Step 3: Payment details</h4>
                <hr />
                <CreditCard />
                <label for="nameOnCard">Name on Card</label>
                <input
                  type="text"
                  id="sample-input"
                  name="nameOnCard"
                  placeholder="John More Doe"
                  onChange={this.onChange}
                />
                <label for="cardNumber">Credit card number</label>
                <CardElement
                  name="paymentField"
                  onChange={this.stripeValidate}
                  id="sample-input"
                />
              </CardContent>
            </Paper>
            <input
              id="sample-input"
              type="submit"
              value="Checkout"
              class="payment-btn"
            />
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}
Payment.PropTypes = {
  payment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  individualHotelData: state.individualHotelData,
  query: state.query,
  roomSelection: state.roomSelection
});

export default injectStripe(
  connect(
    mapStateToProps,
    { setPaymentInfo }
  )(withStyles(styles)(Payment))
);

// export default connect(    mapStateToProps,    { readyLanding, setLandingStatus }  )(withStyles(styles)(Landing));

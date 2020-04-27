import * as React from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const correctOtp = "123456";
const timeoutLimit = 5;

class Otp extends React.Component<
  {},
  { otp: string; isDisabled: boolean; counter: number }
> {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      isDisabled: false,
      counter: timeoutLimit
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ otp: event.target.value });
  };

  enableButton = () => {
    this.setState({ isDisabled: false });
  };

  decrementCounter = () => {
    this.setState({ counter: this.state.counter - 1 });
    if (this.state.counter > 0) {
      setTimeout(this.decrementCounter, 1000);
    } else {
      this.setState({ counter: timeoutLimit });
    }
  };

  checkValidity = () => {
    if (this.state.otp === correctOtp) {
      alert("Correct otp entered");
    } else {
      this.setState({ isDisabled: true });
      setTimeout(this.enableButton, timeoutLimit * 1000);
      setTimeout(this.decrementCounter, 1000);
    }
    this.setState({ otp: "" });
  };

  render() {
    console.log(this.state);
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Input
          type="text"
          style={{ textAlign: "center" }}
          value={this.state.otp}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <Button
          onClick={this.checkValidity}
          disabled={this.state.isDisabled}
          color="primary"
          variant="contained"
          style={{
            position: "absolute",
            left: "25%"
          }}
        >
          Check
        </Button>
        <br />
        <br />
        <label hidden={!this.state.isDisabled}>
          Try again in {this.state.counter} seconds !
        </label>
      </div>
    );
  }
}

export default Otp;

import React from "react";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../../../components/textInput";
import SelectInput from "../../../components/selectInput";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import LocationIcon from "@material-ui/icons/LocationOn";
import { IsInputValid } from "../../../utils/validations.utils";
import { getCountriesInfo } from "../../../utils/creditCard.utils";
import StyledErrorMessage from "../../../components/formErrorMessage";

const StyledSectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: -20px;
`;

const StyledFormBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DefaultErrorInputMessage = "Invalid Value";

class SecurePaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequiredFieldsMissing: false,
      formErrorMessage: ""
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.initSelectInputs();
  }

  initSelectInputs() {
    const currentYear = new Date().getFullYear();
    const yearSelectOptions = Array.from({ length: 9 }, (v, k) => ({
      label: currentYear + k,
      value: currentYear + k
    }));

    const monthSelectOptions = Array.from({ length: 12 }, (v, k) => ({
      label: 1 + k > 9 ? `${1 + k}` : `0${1 + k}`,
      value: 1 + k
    }));

    getCountriesInfo()
      .then(response => {
        const countriesCode = response.data.geonames.map(countryInfo => ({
          label: countryInfo.countryName,
          value: countryInfo.countryCode
        }));
        this.props.SecuredFormStore.selectsOptions = {
          countries: countriesCode,
          year: yearSelectOptions,
          month: monthSelectOptions
        };
      })
      .catch(function(error) {
        console.log("Error in getCountriesCode", error);
      });
  }

  handleChange = name => event => {
    const { formInputs } = this.props.SecuredFormStore;
    formInputs[name].value = event.target.value;

    //For current year: months in the past can’t be selected
    if (name === "year" && event.target.value === new Date().getFullYear()) {
      formInputs.month.value =
        formInputs.month.value < new Date().getMonth() + 1
          ? false
          : formInputs.month.value;
    }

    this.validateField(
      name,
      formInputs[name].rulesTypes,
      formInputs[name].value,
      true
    );
  };

  validateField(name, rulesTypes = [], value, isRequired) {
    const { formInputs } = this.props.SecuredFormStore;
    const isValid = rulesTypes.every(ruleType =>
      IsInputValid(ruleType, value, isRequired)
    );
    formInputs[name].error = !isValid;
  }

  getErrorMessage(fieldName) {
    const fieldObj = this.props.SecuredFormStore.formInputs[fieldName];
    if (fieldObj && fieldObj.error)
      return fieldObj.errorMessage || DefaultErrorInputMessage;
    return null;
  }

  handleFormSubmit() {
    const {
      isRequiredFieldsMissing,
      isAllFieldsValid,
      isMakingPaymentEnabled
    } = this.props.SecuredFormStore;

    if (!isAllFieldsValid()) return;
    if (!isRequiredFieldsMissing()) {
      this.showFieldsMissingMessage("Please fill in the missing fields");
      return;
    }
    if (!isMakingPaymentEnabled) {
      this.showFieldsMissingMessage("The form already submitted");
      return;
    }

    this.props.UiStore.showProgressBar("Making A Payment");
    this.makePayment(() => {
      this.props.UiStore.hideProgressBar();
      this.props.history.push("/thank-you");
    });
  }

  //Mock function
  makePayment(callback) {
    sessionStorage.setItem("formSubmitted", true);
    setTimeout(callback, 3000);
  }

  showFieldsMissingMessage(formErrorMessage) {
    this.setState(
      {
        isRequiredFieldsMissing: true,
        formErrorMessage
      },
      this.hideFieldsMissingMessage
    );
  }
  hideFieldsMissingMessage() {
    setTimeout(() => {
      this.setState({ isRequiredFieldsMissing: false, formErrorMessage:'' });
    }, 3000);
  }

  render() {
    const {
      formInputs,
      selectsOptions,
      monthOptions
    } = this.props.SecuredFormStore;
    const { formErrorMessage } = this.state;
    return (
      <form noValidate autoComplete="off">
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <StyledSectionTitle>
              <LocationIcon />
              <h3>Billing Address:</h3>
            </StyledSectionTitle>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              label="Street Address"
              required={formInputs.address.required}
              value={formInputs.address.value}
              onChange={this.handleChange("address")}
              fullWidth={true}
              errorMessage={this.getErrorMessage("address")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              options={selectsOptions.countries}
              label="Select Country"
              required={formInputs.country.required}
              value={formInputs.country.value}
              onChange={this.handleChange("country")}
              fullWidth={true}
              errorMessage={this.getErrorMessage("country")}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledSectionTitle>
              <CreditCardIcon />
              <h3>Credit Card Details:</h3>
            </StyledSectionTitle>
          </Grid>
          <Grid item xs={12}>
            <TextInput
              label="Card Number"
              required={formInputs.cardNumber.required}
              value={formInputs.cardNumber.value}
              onChange={this.handleChange("cardNumber")}
              fullWidth={true}
              errorMessage={this.getErrorMessage("cardNumber")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SelectInput
              options={monthOptions}
              label="Month"
              required={formInputs.month.required}
              value={formInputs.month.value}
              onChange={this.handleChange("month")}
              fullWidth={true}
              errorMessage={this.getErrorMessage("month")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <SelectInput
              options={selectsOptions.year}
              label="Year"
              required={formInputs.year.required}
              value={formInputs.year.value}
              onChange={this.handleChange("year")}
              fullWidth={true}
              errorMessage={this.getErrorMessage("year")}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextInput
              label="CVV"
              required={formInputs.cvv.required}
              value={formInputs.cvv.value}
              onChange={this.handleChange("cvv")}
              fullWidth={true}
              errorMessage={this.getErrorMessage("cvv")}
            />
          </Grid>

          <Grid item xs={4}>
            <StyledFormBottomContainer>
              <Button variant="outlined" onClick={this.handleFormSubmit}>
                Submit Payment
              </Button>
              {this.state.isRequiredFieldsMissing && (
                <StyledErrorMessage>
                  {formErrorMessage}
                </StyledErrorMessage>
              )}
            </StyledFormBottomContainer>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withRouter(
  inject("SecuredFormStore", "UiStore")(observer(SecurePaymentForm))
);

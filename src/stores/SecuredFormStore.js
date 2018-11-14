import { decorate, observable,computed } from "mobx";
import { RULES_TYPES } from "../utils/validations.utils";
class SecuredFormStore {
  //isFormValid= false;
  formInputs = {
    address: {
      value: "",
      required: true
    },
    country: {
      value: false,
      required: true
    },
    cardNumber: {
      value: "",
      rulesTypes: [RULES_TYPES.CREDIT_CARD_NUMBER],
      errorMessage: "Invalid Card Number",
      required: true
    },
    month: {
      value: false,
      required: true
    },
    year: {
      value: false,
      required: true
    },
    cvv: {
      value: "",
      rulesTypes: [RULES_TYPES.CVV],
      errorMessage: "Invalid Card CVV",
      required: true
    }
  };
  selectsOptions = {
    countries: [],
    month: [],
    year: []
  };

  
  get monthOptions() {
    const selectedYear = this.formInputs.year.value;
    const newMonthOptions =  this.selectsOptions.month.filter(
      month =>
        !selectedYear ||
        selectedYear > new Date().getFullYear() ||
        month.value >= new Date().getMonth() + 1
    );


    return newMonthOptions;
  }

  

  isRequiredFieldsMissing = () => {
    const isValid = Object.keys(this.formInputs)
      .map(key => this.formInputs[key])
      .every(input => !input.required || input.value);
    return isValid;
  };
}

decorate(SecuredFormStore, {
  formInputs: observable,
  selectsOptions: observable,
  monthOptions:computed
});

export default new SecuredFormStore();

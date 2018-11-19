import { types } from "mobx-state-tree";
import { Input } from "./Input";
import _ from "lodash";
import fp from "lodash/fp";

const SecuredFormFields = types.model("SecuredFormFields", {
  address: types.optional(Input, { name: "address" }),
  country: types.optional(Input, { name: "country" }),
  cardNumber: types.optional(Input, { name: "cardNumber" }),
  month: types.optional(Input, { name: "month" }),
  year: types.optional(Input, { name: "year" })
});

export const FormErrorMessages = {
  FieldsValid: "",
  RequiredFieldsFilled: "Please fill in the missing fields",
  FirstPayment: "The form already submitted"
};
export const SecuredForm = types
  .model("SecuredForm", {
    fields: types.optional(SecuredFormFields, {}),
  })
  .actions(self => ({
    updateFieldValue(name, value) {
      self.fields[name].changeValue(value);
    },
    updateFieldError(name, error) {
      self.fields[name].changeError(error);
    }
  }))
  .views(self => {
    //Did all the required fields are filled
    const isRequiredFieldsFilled = () =>
      _.every(self.fields, input => !input.required || input.value);

    //Did all the fields are valid
    const isFieldsValid = () => _.every(self.fields, input => !input.error);

    //Is the first payment action
    const IsFirstPayment = () => !sessionStorage.getItem("formSubmitted");

    return {
      get isFormValid() {
        return isRequiredFieldsFilled() && isFieldsValid() && IsFirstPayment();
      },
      get formErrorMessage() {
        switch (false) {
          case isFieldsValid():
            return FormErrorMessages.FieldsValid;
          case isRequiredFieldsFilled():
            return FormErrorMessages.RequiredFieldsFilled;
          case IsFirstPayment():
            return FormErrorMessages.FieldsValid;
          default:
            return "";
        }
      },
      get monthOptions() {
        const isMonthNotInPast = month =>(
        !self.fields.year.value ||
        +self.fields.year.value > new Date().getFullYear() ||
        month >= new Date().getMonth() + 1);

        return fp.compose(
          fp.filter(month => isMonthNotInPast(month)),
          ()=>fp.range(1, 13),
        )();
      },
      get yearOptions() {
        const currentYear = new Date().getFullYear();
        return _.range(currentYear, currentYear + 9)
      }
    };
  });

export default SecuredForm;

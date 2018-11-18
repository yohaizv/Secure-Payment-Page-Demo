import { types } from 'mobx-state-tree';
import { Input } from './Input';
import _ from 'lodash';

const selectOption = types
    .model("selectOption", {
        label: types.string,
        value: types.string,
    });

const SecuredFormFields = types
    .model("SecuredFormFields", {
        address: types.optional(Input, { name: "address" }),
        country: types.optional(Input, { name: "country" }),
        cardNumber: types.optional(Input, { name: "cardNumber" }),
        month: types.optional(Input, { name: "month" }),
        year: types.optional(Input, { name: "year" }),
    });



export const FormErrorMessages = {
    FieldsValid: "",
    RequiredFieldsFilled: "Please fill in the missing fields",
    FirstPayment: "The form already submitted"
};
export const SecuredForm = types
    .model("SecuredForm", {
        fields: types.optional(SecuredFormFields, {}),
        countriesOptions: types.optional(types.array(selectOption), [])
    })
    .actions(self => ({
        updateFieldValue(name, value) {
            self.fields[name].value = value;
        },
        updateFieldError(name, error) {
            self.fields[name].error = error;
        }
    }))
    .views(self => {
        //Did all the required fields are filled
        const isRequiredFieldsFilled = () => _.every(self.fields, input => !input.required || input.value);

        //Did all the fields are valid
        const isFieldsValid = () => _.every(self.fields, input => !input.error);

        //Is the first payment action
        const IsFirstPayment = () => !sessionStorage.getItem('formSubmitted');

        return ({
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
                        return ""
                }
            },
            get monthOptions(){
                return _.filter(['01','02','03','04','05','06','07','08','09','10','11','12'],
                month=>!self.year.value ||
                +self.fields.year.value > new Date().getFullYear() ||
                +month >= new Date().getMonth() + 1
                );
            }

        })
    });



export default SecuredForm;
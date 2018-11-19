import { getSnapshot, onSnapshot } from "mobx-state-tree";
import { SecuredForm, FormErrorMessages } from "./SecuredForm";
import _ from "lodash";

it("Can create a SecuredForm", () => {
  const securedForm = SecuredForm.create();
  const states = [];

  onSnapshot(securedForm, snapshot => {
    states.push(snapshot);
  });

  securedForm.updateFieldValue("address", "Tel Aviv");
  securedForm.updateFieldError("country", true);

  expect(getSnapshot(securedForm)).toMatchSnapshot();
  expect(states).toMatchSnapshot();
});

it("change SecuredForm field value", () => {
  const securedForm = SecuredForm.create();

  securedForm.updateFieldValue("country", "Tel Aviv");
  expect(securedForm.fields.country.value).toBe("Tel Aviv");
});

it("change SecuredForm field error", () => {
  const securedForm = SecuredForm.create();
  expect(securedForm.fields.country.error).toBe(false);
  securedForm.updateFieldError("country", true);
  expect(securedForm.fields.country.error).toBe(true);
});

it("SecuredForm isFormValid", () => {
  const securedForm = SecuredForm.create();
  securedForm.updateFieldValue("address", "Tel Aviv");
  securedForm.updateFieldValue("country", "Israel");
  securedForm.updateFieldValue("cardNumber", "4580 122345");
  securedForm.updateFieldValue("month", "1");
  expect(securedForm.isFormValid).toBe(false);
  securedForm.updateFieldValue("year", "1");
  expect(securedForm.isFormValid).toBe(true);
  securedForm.updateFieldError("country", true);
  expect(securedForm.isFormValid).toBe(false);
});

it("SecuredForm formErrorMessage", () => {
  const securedForm = SecuredForm.create();
  securedForm.updateFieldValue("address", "Tel Aviv");
  expect(securedForm.formErrorMessage).toBe(
    FormErrorMessages.RequiredFieldsFilled
  );
  securedForm.updateFieldError("cardNumber", true);
  expect(securedForm.formErrorMessage).toBe(FormErrorMessages.FieldsValid);
  securedForm.updateFieldError("cardNumber", false);
  securedForm.updateFieldValue("cardNumber", "4580 122345");
  securedForm.updateFieldValue("country", "Israel");
  securedForm.updateFieldValue("month", "1");
  securedForm.updateFieldValue("year", "1");
  expect(securedForm.formErrorMessage).toBe("");
});

it("Month options", () => {
  const securedForm = SecuredForm.create();
  expect(securedForm.monthOptions.length).toBe(12);

  securedForm.updateFieldValue("year", "2018");
  expect(securedForm.fields.year.value).toBe("2018");
  expect(securedForm.monthOptions).toEqual([11,12]);
});

it("Year options", () => {
  const securedForm = SecuredForm.create();
  expect(securedForm.yearOptions.length).toBe(9);
});

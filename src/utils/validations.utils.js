import { getCreditCardType } from "./creditCard.utils";

export const RULES_TYPES = {
  CREDIT_CARD_NUMBER: "CREDIT_CARD_NUMBER",
  CVV: "CVV"
};

const MapRulesToValidator = {
  [RULES_TYPES.CREDIT_CARD_NUMBER]: cardNumber => {
    cardNumber = cardNumber.replace(/\s/g, "");
    return (
      getCreditCardType(cardNumber) !== "unknown" &&
      Number.isInteger(+cardNumber) &&
      getNumberLength(cardNumber) === 16
    );
  },
  [RULES_TYPES.CVV]: cvv => Number.isInteger(+cvv) && getNumberLength(cvv) === 3
};

export const IsInputValid = (validationRule, value, isRequired) => {
  if (
    validationRule &&
    value &&
    typeof MapRulesToValidator[validationRule] === "function"
  ) {
    return MapRulesToValidator[validationRule](value);
  }
  return true;
};

const getNumberLength = number => number.toString().length;

import React from "react";
import FormContainer from '../../components/formContainer';
import Title from "../../components/title";
import Lock from "@material-ui/icons/Lock";
import SecurePaymentForm from "./components/securePaymentForm";



const SecurePaymentPage = () => (
  <div>
    <Title text="Secure Payment Page" icon={<Lock />} fontSize="24px" />
    <FormContainer title = "Secure Payment Page">
      <SecurePaymentForm />
    </FormContainer>
  </div>
);

export default SecurePaymentPage;

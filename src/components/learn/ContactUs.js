import React from 'react';
import styled from 'styled-components';

const ContactSection = styled.div`
  position: relative;
  padding: 100px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 50px;
  margin-bottom: 50px;
`;

const SkewBackground = styled.div`
  background: linear-gradient(to right, #fa4b37, #df2771);
  background-attachment: fixed;
  position: absolute;
  width: 100%;
  height: 250px;
  top: 200px;
  transform-origin: top right;
  transform: skewY(-10deg);
  z-index: -1;
`;

const ContactWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50px);
`;

const ContactCard = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.4);
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 10px;
  font-weight: 800;
  color: #2e3d49;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 5px;
  box-shadow: inset 0 0 5px lightgray;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  font-weight: 600;
  color: #2e3d49;

  &:required {
    border-left: 3px solid red;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: inset 0 0 5px lightgray;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  font-weight: 600;
  color: #2e3d49;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  background: linear-gradient(to right, #fa4b37, #df2771);
  border-radius: 5px;
  border: none;
  padding: 15px;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Required = styled.span`
  color: red;
`;

// Componente principal
const ContactUs = () => {
  return (
    <ContactSection id="contactus_section">
      <SectionTitle>Contactanos</SectionTitle>
      <SkewBackground />
      <ContactWrapper>
        <ContactCard>
         <Form action="mailto:alfredohuamani750@gmail.com" method="post" enctype="text/plain">
          <div>
              <Label>
                Nombres <Required>*</Required>
              </Label>
              <Label style={{ marginLeft: "150px" }}>
                Apellidos <Required>*</Required>
              </Label>
              <div style={{ display: "flex", gap: "10px" }}>
                <Input type="text" name="fname" required />
                <Input type="text" name="lname" required />
              </div>
            </div>
            <Label>
              Email <Required>*</Required>
            </Label>
            <Input type="email" name="email" required />
            <Label>
              Mensaje <Required>*</Required>
            </Label>
            <Input type="text" name="message" required />
            <Label>Detalles adicionales</Label>
            <TextArea name="additional" />
            <SubmitButton type="submit">Enviar Mensaje</SubmitButton>
          </Form>
        </ContactCard>
      </ContactWrapper>
    </ContactSection>
  );
};

export default ContactUs;

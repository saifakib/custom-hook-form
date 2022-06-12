import React from "react";
import styled from "styled-components";
import Text from "../../UI/texts/Text";
import TextInput from "../../UI/inputs/TextInput";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.8rem;
  color: red;
`;

const InputGroup = ({ label, type, placeholder, name, value, onChange, error, onFocus, onBlur }) => {
  return (
    <Container>
      <Text size="lg">{label}</Text>
      <TextInput
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      { error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default InputGroup;

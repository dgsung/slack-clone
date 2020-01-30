import React, { useReducer } from "react";
import { Message, Button, Container, Header, Input } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value
  };
};

export default function Register(props) {
  const history = useHistory();
  const [registerMutation] = useMutation(REGISTER);
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    email: "",
    password: "",
    usernameError: "",
    emailError: "",
    passwordError: ""
  });
  const {
    username,
    email,
    password,
    nameError,
    emailError,
    passwordError
  } = state;
  const onChange = e => {
    dispatch(e.target);
  };
  const onSubmit = async () => {
    ["nameError", "emailError", "passwordError"].forEach(e =>
      dispatch({
        name: e,
        value: ""
      })
    );
    const res = await registerMutation({ variables: { ...state } });
    const { ok, errors } = res.data.register;
    if (ok) {
      history.push("/");
    } else {
      const error = [];
      errors.forEach(({ path, message }) => {
        error.push({ name: `${path}Error`, value: message });
      });
      console.log(error);
      error.forEach(e => dispatch(e));
    }
  };
  return (
    <Container text>
      <Header as="h2">Register</Header>
      <Input
        error={!!nameError}
        name="username"
        onChange={onChange}
        value={username}
        fluid
        placeholder="username"
      />
      <Input
        error={!!emailError}
        name="email"
        onChange={onChange}
        value={email}
        fluid
        placeholder="email"
      />
      <Input
        error={!!passwordError}
        name="password"
        onChange={onChange}
        type="password"
        value={password}
        fluid
        placeholder="password"
      />
      <Button onClick={onSubmit}>Submit</Button>
      {nameError || emailError || passwordError ? (
        <Message
          error
          header="There was some errors with your submission"
          list={[nameError, emailError, passwordError].filter(e => !!e)}
        />
      ) : null}
    </Container>
  );
}

const REGISTER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(name: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

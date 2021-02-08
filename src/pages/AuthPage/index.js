import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { useForm, Controller } from "react-hook-form";
import { path } from "ramda";
import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";
import * as actions from "../../redux/actions";
import AuthForm from "../../components/Auth";
import { AUTH_TOKEN } from "../../constants";

export const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
        $email: String!
        $password: String!
        $name: String!
        $phone: String!
        $city: String!
        $country: String!
        $OS: String!
    ) {
        signup(
            email: $email
            password: $password
            name: $name
            phone: $phone,
            city: $city,
            country: $country,
            OS: $OS
        ) {
            token
        }
    }
`;
export const LOGIN_MUTATION = gql`
    mutation LoginMutation(
        $email: String!
        $password: String!
    ) {
        login(email: $email, password: $password) {
            token
        }
    }
`;
export const FEED_QUERY = gql`
    {
        feed {
            user {
                id
                name
                email
            }
        }
    }
`;

function AuthPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, errors, control, handleSubmit } = useForm();
  const phoneValidation = useSelector(path(['state', 'phoneValidation']))
  const isSignedUp = useSelector(path(['state', 'isSignedUp']))
  const loginError = useSelector(path(['state', 'error']))
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    phone: '',
    city: '',
    country: '',
    OS: '',
  })

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      history.push('/home');
    }
  });

  const [signup, { error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      phone: formState.phone,
      city: formState.city,
      country: formState.country,
      OS: formState.OS,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
    }
  });

  useEffect(() => {
    if (isSignedUp) {
      history.push('/home');
    }
  }, [isSignedUp])

  const onSubmit = () => {
    if (!phoneValidation) {
      return dispatch(actions.phoneValidation())
    }
    return dispatch(actions.signUp(signup))
  }

  return (
    <div className='container'>
      <AuthForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        formState={formState}
        setFormState={setFormState}
        Controller={Controller}
        control={control}
        phoneValidation={phoneValidation}
        loginError={loginError}
      />
    </div>
  )
}

export default AuthPage
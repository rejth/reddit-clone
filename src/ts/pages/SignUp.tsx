import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Form from '../components/shared/Form';
import Label from '../components/shared/Form/Label';
import Input, { InputWrapper } from '../components/shared/Form/Input';
import SubmitButton from '../components/shared/Form/SubmitButton';
import Error from '../components/shared/Form/Error';
import { signupUser } from '../../services/redditService';

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const SignUp: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IFormInputs> = async (e: any): Promise<any> => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const userCreds = await signupUser({ email: email.value, password: password.value });
    return userCreds;
  };

  return (
    <Form isLoading={false} onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Label>Username</Label>
        <Input
          type="text"
          error={!!errors?.name?.message}
          {...register('name', { required: 'Username is required' })}
        />
        <Error>{errors?.name?.message}</Error>
      </InputWrapper>

      <InputWrapper>
        <Label>Email</Label>
        <Input
          type="email"
          error={!!errors?.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <Error>{errors?.email?.message}</Error>
      </InputWrapper>

      <InputWrapper>
        <Label>Password</Label>
        <Input
          type="password"
          error={!!errors?.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        <Error>{errors?.password?.message}</Error>
      </InputWrapper>

      <InputWrapper>
        <Label>Confirm password</Label>
        <Input
          type="password"
          error={!!errors?.confirm?.message}
          {...register('confirm', { required: 'Password is required' })}
        />
        <Error>{errors?.confirm?.message}</Error>
      </InputWrapper>

      <SubmitButton type="submit">Sign up</SubmitButton>
    </Form>
  );
};

export default SignUp;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';

import Form from '../components/shared/Form';
import Label from '../components/shared/Form/Label';
import Input, { InputWrapper } from '../components/shared/Form/Input';
import SubmitButton from '../components/shared/Form/SubmitButton';
import Error from '../components/shared/Form/Error';
import { signupUser, checkIfUsernameTaken } from '../../services/redditService';

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const SignUp: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'onBlur' });

  const history = useHistory();
  const mutation = useMutation(signupUser, {
    onSuccess: () => {
      history.push('/');
      toast.success('Sign up successful!');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data: any): void => {
    const { username, email, password } = data;
    mutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <Form isLoading={false} onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Label>Username</Label>
        <Input
          type="text"
          error={!!errors?.username?.message}
          {...register('username', {
            required: 'Username is required',
            validate: checkIfUsernameTaken,
          })}
        />
        <Error>{errors?.username?.message}</Error>
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
          {...register('confirm', {
            required: 'Password is required',
            validate: (value: string) => {
              const { password } = getValues();
              return password === value || 'Password should match!';
            },
          })}
        />
        <Error>{errors?.confirm?.message}</Error>
      </InputWrapper>

      <SubmitButton type="submit">Sign up</SubmitButton>
    </Form>
  );
};

export default SignUp;

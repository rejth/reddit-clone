import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import shallow from 'zustand/shallow';

import Form from '../components/shared/components/Form';
import Label from '../components/shared/styles/Label';
import Input, { InputWrapper } from '../components/shared/styles/Input';
import SubmitButton from '../components/shared/components/Form/SubmitButton';
import Error from '../components/shared/styles/Error';

import useStore from '../store';
import { loginUser } from '../../services/redditService';

interface IFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'onBlur' });

  const history = useHistory();

  const [setUser] = useStore((s) => [s.setUser], shallow);
  const mutation = useMutation(loginUser, {
    onSuccess: (user: any) => {
      setUser(user);
      history.push('/');
      toast.success('Login successful!', { duration: 5000, icon: '👌' });
    },
    onError: (error: any) => {
      let message = error?.code;
      switch (message) {
        case 'auth/wrong-password':
          message = 'Correct your username or password';
          break;
        case 'auth/user-not-found':
          message = 'User could not be found. Sign up!';
          break;
        default:
          message = 'Something went wrong. Try again or contact the support';
          break;
      }
      toast.error(message, { duration: 5000, icon: '🤢' });
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data: any): void => {
    const { email, password } = data;
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <Form
      isLoading={false}
      onSubmit={handleSubmit(onSubmit)}
    >
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

      <SubmitButton type="submit">Login</SubmitButton>
    </Form>
  );
};

export default Login;

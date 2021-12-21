import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import isURL from 'validator/lib/isURL';

import { RadioGroupWrapper } from '../components/shared/components/RadioGroup';
import RadioGroupOption from '../components/shared/components/RadioGroup/Option';
import Form from '../components/shared/components/Form';
import SubmitButton from '../components/shared/components/Form/SubmitButton';

import Input, { InputWrapper } from '../components/shared/styles/Input';
import SelectWrapper from '../components/shared/styles/SelectWrapper';
import Label from '../components/shared/styles/Label';
import Error from '../components/shared/styles/Error';

import useStore from '../store';
import { createPost } from '../../services/redditService';
import { getTimestamp } from '../../services/firebase';

interface IFormInputs {
  type: string;
  category: string;
  title: string;
  text?: string;
  url?: string;
}

const CreatePost: React.FC = (): React.ReactElement => {
  const user: any = useStore((store) => store.user);
  const [type, setType] = useState<string>('text');
  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ mode: 'onBlur' });
  const mutation = useMutation(createPost, {
    onSuccess: ({ category, id }: any) => {
      history.push(`/categories/${category}/${id}`);
      toast.success('New post is created successful!', { duration: 5000, icon: '👌' });
    },
    onError: () => {
      const message = 'Something went wrong. Try again or contact the support';
      toast.error(message, { duration: 5000, icon: '🤢' });
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs): void => {
    const {
      category,
      title,
      text = '',
      url = '',
    } = data;
    const post = {
      type,
      category,
      title,
      text,
      url,
      views: 0,
      score: 0,
      created: getTimestamp(),
      upvotePercentage: 100,
      author: {
        uid: user?.uid || '',
        username: user?.username || '',
      },
      votes: {
        [user?.uid]: 1,
      },
    };

    if (type === 'text') {
      post.text = text;
    } else {
      post.url = url;
    }

    mutation.mutate(post);
  };

  const categories = useMemo(
    () => ['programming', 'news', 'videos', 'fashion', 'music', 'funny'],
    [],
  );
  const postTypes = useMemo(
    () => [
      {
        label: 'Link',
        value: 'link',
      },
      {
        label: 'Text',
        value: 'text',
      },
    ],
    [],
  );

  return (
    <Form
      isLoading={false}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputWrapper>
        <Label>Type</Label>
        <RadioGroupWrapper>
          {postTypes.map((option: any) => (
            <RadioGroupOption
              {...option}
              key={option.value}
              isActive={type === option.value}
              onClick={(value: string) => setType(value)}
            />
          ))}
        </RadioGroupWrapper>
      </InputWrapper>

      <InputWrapper>
        <Label>Category</Label>
        <SelectWrapper>
          <Input
            type="select"
            as="select"
            defaultValue={categories[0]}
            error={!!errors?.category?.message}
            {...register('category', { required: 'Category is required' })}
          >
            {categories.map((category: string) => (
              <option key={category}>{category}</option>
            ))}
          </Input>
        </SelectWrapper>
        <Error>{errors?.category?.message}</Error>
      </InputWrapper>

      <InputWrapper>
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="enter the post title"
          error={!!errors?.title?.message}
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 5,
              message: 'Title must be at least 5 characters',
            },
            maxLength: {
              value: 100,
              message: 'Title must be less than 100 characters',
            },
          })}
        />
        <Error>{errors?.title?.message}</Error>
      </InputWrapper>

      {type === 'text' && (
      <InputWrapper>
        <Label>Text</Label>
        <Input
          type="text"
          as="textarea"
          rows={4}
          placeholder="enter the post content"
          {...register('text', {
            required: 'Title is required',
            minLength: {
              value: 5,
              message: 'Text must be at least 5 characters',
            },
            maxLength: {
              value: 10000,
              message: 'Text must be less than 100 characters',
            },
          })}
        />
        <Error>{errors?.text?.message}</Error>
      </InputWrapper>
      )}

      {type === 'link' && (
      <InputWrapper>
        <Label>URL</Label>
        <Input
          type="url"
          placeholder="enter the URL"
          {...register('url', {
            required: 'URL is required',
            validate: (value: any) => (isURL(value) || 'Provide a valid URL'),
          })}
        />
        <Error>{errors?.url?.message}</Error>
      </InputWrapper>
      )}

      <SubmitButton type="submit">Create post</SubmitButton>
    </Form>
  );
};

export default CreatePost;

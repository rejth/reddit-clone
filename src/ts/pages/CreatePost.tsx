import React, { useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import isURL from 'validator/lib/isURL';

import { RadioGroupWrapper } from '../components/shared/components/RadioGroup';
import RadioGroupOption from '../components/shared/components/RadioGroup/Option';
import Form from '../components/shared/components/Form';
import Label from '../components/shared/styles/Label';
import Input, { InputWrapper } from '../components/shared/styles/Input';
import SelectWrapper from '../components/shared/styles/SelectWrapper';
import SubmitButton from '../components/shared/components/Form/SubmitButton';
import Error from '../components/shared/styles/Error';

interface IFormInputs {
  type: string;
  category: string;
  title: string;
  text?: string;
  url?: string;
}

const CreatePost: React.FC = () => {
  const [postType, setPostType] = useState<string>('text');

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<IFormInputs> = (): void => {};

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
              isActive={postType === option.value}
              onClick={(value: string) => setPostType(value)}
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

      {postType === 'text' && (
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

      {postType === 'link' && (
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

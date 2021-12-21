import React from 'react';
import { useQuery } from 'react-query';

import LoadingIndicator from '../components/shared/components/LoadingIndicator';
import NothingFound from '../components/shared/components/NothingFound';
import { getPosts } from '../../services/redditService';

const PostList: React.FC = (): React.ReactElement => {
  const { data, isLoading, error } = useQuery('posts', getPosts);

  if (isLoading) return <LoadingIndicator />;
  if (!data) return <NothingFound />;
  if (error) return <NothingFound text="Something went wrong. Try again or contact the support" />;

  return <></>;
};

export default PostList;

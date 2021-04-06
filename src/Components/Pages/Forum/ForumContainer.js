import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Forum from './Forum';
import TopicForm from './TopicEditor/TopicForm';
import { TOPICS } from '../../../graphql/Topic';

function ForumContainer({ history }) {
  const [open, setOpen] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(TOPICS);

  useEffect(() => {
    refetch();
  }, [open, refetch]);

  const goToPage = (topicId) => {
    history.push(`/topics/${topicId}`);
  };

  if (loading) return <p>LOADING...</p>;
  if (error) return <p>{`ERROR: ${error}`}</p>;

  return (
    <div>
      <Forum data={data} modalOpen={setOpen} goToPage={(TopicId) => goToPage(TopicId)} />
      <TopicForm open={open} close={() => setOpen(false)} />
    </div>
  );
}

export default ForumContainer;
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import axios from 'axios';
import { Avatar, Chip, Icon, Typography, Button, Modal, Backdrop, Paper } from '@material-ui/core';
import TopicForm from './TopicForm';

const TOPICS = gql`
  query Topics {
    topics {
      _id
      username
      subject
      body
      date
      url
      tags
      comments {
        commentBody
      }
    }
  }
`;

function ArticleList({ history }) {
  const [topics, setTopics] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(TOPICS);


  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/topics')
  //     .then((res) => {
  //       setTopics(res.data.body);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    // axios
    //   .get('http://localhost:5000/topics')
    //   .then((res) => {
    //     setTopics(res.data.body);
    //   })
    //   .catch((err) => console.log(err));
    refetch();
  }, [open]);

  const goToPage = (topic_id) => {
    history.push(`/topics/${topic_id}`);
  };

  if (loading) return <p>LOADING...</p>;
  if (error) return <p>{`ERROR: ${error}`}</p>;

  return (
    <div>
      <div className='flex_' style={{ alignItems: 'center', justifyContent: 'flex-end', marginRight: 20, marginBottom: 20 }}>
        <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
          Ask a question
        </Button>
      </div>
      {data.topics &&
        data.topics.map((topic) => {
          return (
            <div key={topic._id} style={{ margin: 20 }}>
              <Paper onClick={() => goToPage(topic._id)} style={{ padding: 30, paddingRight: 50, paddingLeft: 50 }} elevation={3}>
                <div className='flex_' style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Typography variant='h5' gutterBottom className='blue'>
                    {topic.subject ? topic.subject : ''}
                  </Typography>
                  <div style={{ flex: 1 }} />
                  <Icon className='blue' style={{ marginRight: 15 }}>
                    thumb_up
                  </Icon>
                  <Icon className='blue' style={{ marginRight: 15 }}>
                    share
                  </Icon>
                </div>

                <Typography variant='body2' gutterBottom>
                  {topic.body}
                </Typography>
                <Paper elevation={3} />

                <div className='flex_' style={{ alignItems: 'center', marginTop: 20 }}>
                  <Avatar style={{ width: 30, height: 30, backgroundColor: 'orange', marginRight: 5 }} />
                  <Typography variant='button' className='blue' style={{ marginRight: 10 }}>
                    {topic.username}
                  </Typography>
                  <Typography variant='overline' className='lightgrey'>
                    { getDateFromTimestamp(topic.date) }
                  </Typography>
                  <div style={{ flex: 1 }} />
                  {topic.tags.length > 0 &&
                    topic.tags.map((t, idx) => (
                      <Chip key={idx} label={t} variant='outlined' style={{ marginRight: 5 }} color={idx % 2 === 0 ? 'primary' : 'secondary'} />
                    ))}
                </div>
              </Paper>
            </div>
          );
        })}
      <Modal
        style={{ width: '60%', top: 100, left: '20%' }}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <TopicForm close={() => setOpen(false)} />
      </Modal>
    </div>
  );
}

export default ArticleList;

function getDateFromTimestamp(timestamp) {
  const date = new Date(Date(timestamp)).toLocaleDateString('fr-FR');
  const hours = new Date(Date(timestamp)).getHours('fr-FR');
  const minutes = new Date(Date(timestamp)).getMinutes('fr-FR');

  return `${date} - ${hours}:${minutes}`;
}

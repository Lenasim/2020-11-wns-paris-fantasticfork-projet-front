import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Paper, Icon, Avatar, TextField, IconButton } from '@material-ui/core';
import { CREATE_COMMENT } from '../../../../graphql/Comment';
import './NewComment.css';

// eslint-disable-next-line camelcase
export default function NewComment({ reply, topic_id, uploaded, cancel }) {
  const firstname = localStorage.getItem('stud-connect@firstname');
  const lastname = localStorage.getItem('stud-connect@lastname');
  const authorID = localStorage.getItem('stud-connect@userID');

  const [message, setMessage] = useState('');

  // eslint-disable-next-line no-empty-pattern
  const [createComment, {}] = useMutation(CREATE_COMMENT);

  const submitCommment = async () => {
    try {
      await createComment({ 
        variables: { 
          topicId: topic_id, 
          author: `${firstname} ${lastname}`, 
          authorID, 
          commentBody: message 
        } });
      cancel();
      uploaded();
    } catch (e) {
      cancel();
    }
  };

  return (
    <div className='NewComment'>
      {reply && (
        <div className='NewComment_reply'>
          <Icon className='NewComment_reply_icon'>subdirectory_arrow_right</Icon>
        </div>
      )}
      <Paper className='NewComment_container' elevation={3}>
        <Avatar className='NewComment_avatar'>M</Avatar>
        <TextField
          id='Comment'
          label='Comment'
          multiline
          rows={4}
          variant='outlined'
          className='NewComment_textfield'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className='NewComment_button_container'>
          <IconButton style={{ marginRight: 0 }} color='primary' onClick={submitCommment}>
            <Icon>send</Icon>
          </IconButton>
          <IconButton style={{ marginRight: 0 }} color='primary' onClick={cancel}>
            <Icon>close</Icon>
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}

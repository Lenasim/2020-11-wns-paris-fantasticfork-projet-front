import React, { useState } from 'react';
import ArticleView from './ArticleView';

function Article({ data, setNewMessage }) {
  const [heart, setHeart] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [toggleWrite, setToggleWrite] = useState(false);

  return (
    <ArticleView
      data={data}
      heart={heart}
      toggle={toggle}
      toggleWrite={toggleWrite}
      setHeart={() => setHeart(!heart)}
      setToggle={() => setToggle(!toggle)}
      openToggleWrite={() => setToggleWrite(true)}
      closeToggleWrite={() => setToggleWrite(false)}
      setNewMessage={() => setNewMessage(true)}
    />
  );
}

export default Article;

import React, { useState } from 'react';
import { Toolbar, InputBase, Tab, Tabs, Icon, Fab, Button } from '@material-ui/core';
import './SearchTools.scss';

function SearchTools({ topics, modalOpen }) {
  const [tabsValue, setTabsValue] = useState(0);
  const [toolsOpened, toggleTools] = useState(true);

  const sortByDate = () => {
      const _topics = [...topics.get].sort((a, b) => b.createdAt - a.createdAt);
      topics.set(_topics);
  }

  const sortByPopularity = () => {
      const _topics = [...topics.get].sort((a, b) => b.like - a.like);
      topics.set(_topics);
  }

  const filterTopics = (e) => {
      const searchedString = e.target.value.toLowerCase();

      if (e.target.value === '') topics.set(topics.list);
      else {
          const displayedTopics = [];

          topics.list.forEach((topic) => {
              const subject = topic.subject.toLowerCase();
              const body = topic.body.toLowerCase();

              if (subject.includes(searchedString) || body.includes(searchedString)) {
                  displayedTopics.push(topic);
              }
          });
          topics.set(displayedTopics);
      }
  }

  return (
      <div className={`${!toolsOpened && "SearchTools-close"}`}>
          <Toolbar className='Toolbar'>
              <div className='SearchTools-row1'>
                  <Button variant='contained' color='primary' onClick={() => modalOpen(true)}>
                  Ask a question
                  </Button>
                  <InputBase 
                      onChange={filterTopics} 
                      className='SearchBar' 
                      placeholder='Search...' 
                      inputProps={{'aria-label': 'search'}} 
                  />
              </div> 

              <Tabs className='Tabs' value={tabsValue} onChange={(e, newValue) => setTabsValue(newValue)}>
                  <Tab label='Recent topics' onClick={sortByDate}/>
                  <Tab label='Popular topics' onClick={sortByPopularity}/>
              </Tabs>

          </Toolbar>

          <Fab size='small' className='filter-icon-mobile' onClick={() => toggleTools(!toolsOpened)}>
              <Icon>{ toolsOpened ? 'close' : 'filter_list'}</Icon>
          </Fab>
      </div>
  );
}

export default SearchTools;
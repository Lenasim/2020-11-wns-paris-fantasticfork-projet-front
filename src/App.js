import { Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navbar from './Components/Navbar/Navbar';
import SubNavbar from './Components/Navbar/SubNavbar';
import ArticleContainer from './Components/Forum/ArticleContainer';
import ArticleList from './Components/Forum/ArticleList';
import './App.css';

const menu = [
  { text: 'Home', icon: 'home', link: '/' },
  { text: 'Home', icon: 'home', link: '/' },
  { text: 'Home', icon: 'home', link: '/' },
  { text: 'Forum', icon: 'forum', link: '/topics' },
];

const client = new ApolloClient({
  uri: 'https://stud-connect-back.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex_ lightgreyBackground' style={{ height: '100vh', width: '100%' }}>
        <div style={{ width: 200 }}>
          <Navbar menu={menu} />
        </div>
        <div style={{ width: '100%' }}>
          <SubNavbar title={menu.text} />
          <div className='lightgreyBackground' style={{ marginTop: 70, padding: 40 }}>
            <Switch>
              <Route exact path='/' component={ArticleList} />
              <Route exact path='/topics' history component={ArticleList} />
              <Route path='/topics/:id' component={ArticleContainer} />
            </Switch>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;

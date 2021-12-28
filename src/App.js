import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from './Components/theme';
import { Authenticated, Visitor } from './Layouts';
import Home from './Components/Pages/Home/Home';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import Chat from './Components/Pages/Chat/Chat';
import RegisterContainer from './Components/Pages/Register/RegisterContainer';
import LoginContainer from './Components/Pages/Login/LoginContainer';
import TopicContainer from './Components/Pages/Forum/Topic/TopicContainer';
import ForumContainer from './Components/Pages/Forum/ForumContainer';
import './App.scss';

// const initialState = {
//   isAuth: !!localStorage.getItem('stud-connect@userID'),
//   userID: localStorage.getItem('stud-connect@userID') || '',
//   token: localStorage.getItem('stud-connect@token') || '',
//   tokenExpiration: localStorage.getItem('stud-connect@tokenExpiration') || '',
// };

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <RouteWrapper exact path='/' component={Home} protectedRoute layout={Authenticated} text='Home' />
        <RouteWrapper exact path='/home' component={Home} protectedRoute layout={Authenticated} text='Home' />
        <RouteWrapper exact path='/register' component={RegisterContainer} layout={Visitor} />
        <RouteWrapper exact path='/login' component={LoginContainer} layout={Visitor} />
        <RouteWrapper
          exact
          path='/dashboard'
          component={Dashboard}
          protectedRoute
          layout={Authenticated}
          text='Dashboard'
        />
        <RouteWrapper exact path='/topics' history component={ForumContainer} layout={Authenticated} text='Forum' />
        <RouteWrapper path='/topics/:id' component={TopicContainer} protectedRoute layout={Authenticated} />
        <RouteWrapper exact path='/chat' component={Chat} protectedRoute layout={Authenticated} text='Chat' />
      </Switch>
    </ThemeProvider>
  );
}

function RouteWrapper(props) {
  const { component: Component, layout: Layout, text, protectedRoute, ...rest } = props;
  const isAuth = !!localStorage.getItem('stud-connect@userID');
  global.userId = localStorage.getItem('stud-connect@userID');

  if (protectedRoute && !isAuth) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  return (
    <Route
      {...rest}
      render={(_props) => (
        <Layout title={text} {..._props}>
          <Component {..._props} />
        </Layout>
      )}
    />
  );
}

export default App;

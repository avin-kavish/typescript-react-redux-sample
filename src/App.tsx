import React, {Suspense, lazy} from 'react';
import {globalCss} from './styles';
import {hot} from 'react-hot-loader/root';
import {Global} from '@emotion/core';
import {FullWidthLayout} from './layouts';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Home} from './routes/home';
import {routes} from './routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Centered} from './components';
import {Provider} from 'react-redux';
import store from './state/store';

function App() {

  return (
      <Provider store={store}>
        <Global styles={globalCss}/>
        <Router>
        <FullWidthLayout>
          <Suspense fallback={<LoadingScreen />}>
          <Switch>
          <Route exact path="/" component={Home}/>
          <Route path={routes.customQuestionManager} component={LazyQuestionManager}/>
          </Switch>
          </Suspense>
        </FullWidthLayout>
        </Router>
      </Provider>
  )
}

const LazyQuestionManager = lazy(() => import('./routes/custom-question-manager/CustomQuestionManager'))

function LoadingScreen() {

  return (
      <Centered>
        <FontAwesomeIcon icon={faSpinner} spin />
      </Centered>
  )
}

export default hot(App)

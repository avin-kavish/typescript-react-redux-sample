import React, {Suspense, lazy} from 'react';
import {globalCss} from './styles';
import {hot} from 'react-hot-loader/root';
import {Global} from '@emotion/core';
import {FullWidthLayout} from './layouts';
import {Router, Route, Switch} from 'react-router-dom'
import {Home} from './routes/home';
import {routes} from './routes';
import {LoadingScreen} from './components';
import {Provider} from 'react-redux';
import store from './state/store';
import history from './state/history'

function App() {

  return (
      <Provider store={store}>
        <Global styles={globalCss}/>
        <Router history={history}>
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

const LazyQuestionManager = lazy(() => import('./routes/custom-question-manager'))

export default hot(App)

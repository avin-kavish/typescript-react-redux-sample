import React from 'react'
import {Card} from '../../components';
import {css} from '@emotion/core';
import SearchBox from './SearchBox';
import Header from './Header';
import DataTable from './DataTable';
import ActionBar from './ActionBar';
import {Route, RouteComponentProps} from 'react-router';
import Popup from 'reactjs-popup';
import AddQuestion from './add-question/AddQuestion';

export function CustomQuestionManager({match, history}: RouteComponentProps) {

  return (
      <>
        <Header/>
        <SearchBox/>
        <Card css={css`padding: 24px 0;`}>
          <DataTable/>
          <ActionBar/>
        </Card>
        <Route
            path={`${match.url}/add-question`}
            component={() => (
                <Popup
                    modal
                    open
                    closeOnDocumentClick
                    onClose={() => history.goBack()}
                    contentStyle={{backgroundColor: 'transparent', border: 0}}
                >
                  <AddQuestion/>
                </Popup>
            )}
        />
      </>
  )
}


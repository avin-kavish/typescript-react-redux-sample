import React from 'react'
import {Card} from '../../components';
import {css} from '@emotion/core';
import SearchBox from './SearchBox';
import Header from './Header';
import DataTable from './DataTable';
import ActionBar from './ActionBar';

export default function CustomQuestionManager() {

  return (
      <>
        <Header/>
        <SearchBox/>
        <Card css={css`padding: 24px 0;`}>
          <DataTable/>
          <ActionBar/>
        </Card>
      </>
  )
}


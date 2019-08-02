import React from 'react'
import {Card} from '../../components';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {css} from '@emotion/core';
import {Table} from '../../components/Table';
import {Question, questions} from '../../data/questions';
import SearchBox from './SearchBox';
import Header from './Header';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function CustomQuestionManager() {

  return (
      <>
        <Header/>
        <SearchBox/>
        <Card css={css`padding: 24px 0;`}>
          <Table
              columns={questionCols}
              data={questions}
              render={renderFn}
          />
        </Card>
      </>
  )
}

const renderFn = (data: Question) => (
    <tr>
      <td>{data.id}</td>
      <td>{data.question}</td>
      <td>{data.category}</td>
      <td>{data.state}</td>
      <td>View</td>
      <td>View</td>
      <td>{data.status}</td>
      <td>{data.display}</td>
      <td><FontAwesomeIcon icon={faEllipsisH}/></td>
    </tr>
)

const questionCols = [
  {
    label: '#',
    key: 'id'
  },
  {
    label: 'Question',
    key: 'question'
  },
  {
    label: 'Category',
    key: 'question'
  },
  {
    label: 'State',
    key: 'question'
  },
  {
    label: 'Question Group',
    key: 'question'
  },
  {
    label: 'License',
    key: 'question'
  },
  {
    label: 'Status',
    key: 'question'
  },
  {
    label: 'Display',
    key: 'display'
  },
  {
    label: 'Action',
    key: 'action'
  },
]

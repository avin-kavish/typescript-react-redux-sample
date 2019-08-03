import React from 'react';
import styled from '@emotion/styled';
import {theme} from '../styles';

type TableProps<T> = {
  columns: {
    label: string
    key: string
  }[]
  data: T[]
  render: (datum: T) => JSX.IntrinsicElements['tr']
} & JSX.IntrinsicElements['table']

export function Table<T>({columns = [], data = [], render, ...props}: TableProps<T>) {

  return (
      <StyledTable {...props}>
        <thead>
        <tr>
          {columns.map(({label, key}, i) => <th key={`${key} ${i}`}>{label}</th>)}
        </tr>
        </thead>
        <tbody>
        {data.map(datum => render(datum))}
        </tbody>
      </StyledTable>
  )
}

const StyledTable = styled.table`
  width: 100%;
  border: 0;
  border-spacing: 0;
  table-layout: auto;

  th,td {
    padding: 24px 16px;
  }

  th {
    padding-top: 12px;
    text-align: left;
    color: #808c9a;
  }

  tbody td {
    border-top: 1px solid #e7e8ec;
    background-color: ${theme.background.td};
  }

  td:first-child, th:first-child {
    padding-left: 36px;
  }

  td:last-child, th:last-child {
    padding-right: 36px;
  }
`

import React from 'react';
import styled from '@emotion/styled';

type TableProps<T> = {
  columns: {
    label: string
    key: string
  }[]
  data: T[]
  render: (datum: T) => JSX.IntrinsicElements['tr']
}

export function Table<T>({columns = [], data = [], render}: TableProps<T>) {

  return (
      <StyledTable>
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

  th,td {
    padding: 24px 16px;
  }

  th {
    text-align: left;
    color: #808c9a;
  }

  tbody td {
    border-top: 1px solid #e7e8ec;
    background-color: #fafcfb;
  }

  td:first-child, th:first-child {
    padding-left: 36px;
  }

  td:last-child, th:last-child {
    padding-right: 36px;
  }
`

import React from 'react';
import styled from '@emotion/styled';
import {theme} from '../styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons';
import {FlexBox} from './Containers';
import {css} from '@emotion/core';
import {UnstyledButton} from './Buttons';
import {SortDirection, SortType} from '../state/questions';

type ColKey<T> = keyof T

export type ColumnDef<T> = {
  label: string
  key: ColKey<T>
  sortable: boolean
}

type TableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  render: (datum: T) => JSX.IntrinsicElements['tr']
  sort?: SortType<T>
  onSortClick?: (value: SortType<T>) => void
} & JSX.IntrinsicElements['table']

export function Table<T>({columns = [], data = [], render, sort, onSortClick, ...props}: TableProps<T>) {

  return (
      <StyledTable {...props}>
        <thead>
        <tr>
          {columns.map((colDef, i) =>
              <TH
                  key={`${colDef.key} ${i}`}
                  {...{colDef, sort, onSortClick}}
              />)}
        </tr>
        </thead>
        <tbody>
          {data.map(datum => render(datum))}
        </tbody>
      </StyledTable>
  )
}

type THProps<T> = { colDef: ColumnDef<T>, sort: SortType<T>, onSortClick: (value: SortType<T>) => void }

function TH<T>({colDef: {label, key, sortable}, sort, onSortClick}: THProps<T>) {

  const direction = sort && sort[0] === key ? sort[1] : 'none'
  const nextDirection: SortDirection =
      sort && sort[0] === key
          ?
          sort[1] === 'none'
              ? 'asc'
              : sort[1] === 'asc'
              ? 'desc'
              : 'none'
          : 'asc'

  return (
      <th>
        <FlexBox>
          {label}
          {sortable && <SortButton
              direction={direction}
              onClick={() => onSortClick([key, nextDirection])}
          />}
        </FlexBox>
      </th>
  )
}

type SortButtonProps = {
  direction?: SortDirection
  onClick: () => void
}

function SortButton({direction = 'none', onClick}: SortButtonProps) {
  const icon = direction === 'none'
      ? faSort
      : direction === 'asc'
          ? faSortUp
          : faSortDown

  return (
      <UnstyledButton
          css={css`margin-left: 16px;cursor: pointer;`}
          onClick={onClick}
      >
        <FontAwesomeIcon icon={icon}/>
      </UnstyledButton>
  )
}

const StyledTable = styled.table`
  width: 100%;
  border: 0;
  border-spacing: 0;
  table-layout: auto;

  th,td {
    padding: 16px 16px;
  }

  th {
    padding-top: 12px;
    text-align: left;
    color: #808c9a;
    white-space: nowrap;
  }

  tbody td {
    border-top: 1px solid #e7e8ec;
    background-color: ${theme.background.td};
  }

  td:first-of-type, th:first-of-type {
    padding-left: 36px;
  }

  td:last-of-type, th:last-of-type {
    padding-right: 36px;
  }
`


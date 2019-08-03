import React from 'react';
import {FlexBox} from './Containers';
import styled from '@emotion/styled';
import {theme} from '../styles';
import {InputBox} from './Forms';

type PagerProps = {
  maxPages?: number
  total: number
  perPage: number
  current: number
  onChange: (newPage: number) => void
}

export function Pager({}: PagerProps) {

  return (
      <FlexBox>
        <DirectionButton>{'< Back'}</DirectionButton>
        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <DirectionButton>{'Next >'}</DirectionButton>
      </FlexBox>
  )
}

const DirectionButton = styled.div`
  color: #9dbcd1;
  padding: 8px 16px;
  cursor:pointer;
`

const PageButton = styled.div<{ active?: boolean }>`
  background-color: ${props => props.active && theme.yellow};
  color: ${props => props.active && 'white'};
  border-radius: 4px;
  padding: 8px 16px;
  cursor:pointer;
`

type PageCountProps = {
  value: number
  onChange: (value: number) => void
}

export function PageCount({value, onChange}: PageCountProps) {

  return (
      <div>
        Show
        <TinyInput/>
        items
      </div>
  )
}

const TinyInput = styled(InputBox)`
  width: 32px;
  padding: 4px;
  margin: 0 8px;
  background-color: white;
  color: ${theme.blue}
`

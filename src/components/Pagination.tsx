import React, {useState} from 'react';
import {FlexBox} from './Containers';
import styled from '@emotion/styled';
import {theme} from '../styles';
import {InputBox} from './Forms';

export type PagerProps = {
  maxPages?: number
  total: number
  perPage: number
  current: number
  onChange: (newPage: number) => void
}

export function Pager({total, perPage, current, onChange}: PagerProps) {
  const pages = Math.ceil(total / perPage)
  const mapHelper = Array(pages || 1).fill(0).map((_, i) => i + 1)

  const canBack = current > 1
  const canForward = current < pages

  return (
      <FlexBox>
        <DirectionButton onClick={canBack ? () => onChange(current - 1) : void 0}>{'< Back'}</DirectionButton>
        {mapHelper.map(page =>
            <PageButton
                key={page}
                active={current === page}
                onClick={() => onChange(page)}
            >
              {page}
            </PageButton>
        )}
        <DirectionButton onClick={canForward ? () => onChange(current + 1) : void 0}>{'Next >'}</DirectionButton>
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

export type PageCountProps = {
  value: number
  onChange: (value: number) => void
}

export function PageCount({value, onChange}: PageCountProps) {
  const [text, set] = useState('' + value)

  const localOnChange: JSX.IntrinsicElements['input']['onChange'] = e => {
    const {value} = e.target

    if (value === '')
      set(value)
    else if (!isNaN(+value))
      set(value)
  }

  const keyUp: JSX.IntrinsicElements['input']['onKeyUp'] = e => {
    if (e.key === 'Enter')
      onChange(+text)
  }

  return (
      <div>
        Show
        <TinyInput
            value={text}
            onChange={localOnChange}
            onKeyUp={keyUp}
        />
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

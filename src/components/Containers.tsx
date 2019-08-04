import styled from '@emotion/styled';
import {AlignItemsProperty, JustifyContentProperty} from 'csstype';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

type FlexProps = {
  alignItems?: AlignItemsProperty
  justifyContent?: JustifyContentProperty
}

export const FlexBox = styled.div<FlexProps>`
  display: flex;
  align-items: ${props => props.alignItems || 'center'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
`

export const FlexSpacer = styled.div`
  flex-grow:1;
`

const defaultWidth = '1rem'

export const Spacer = styled.div<{ width?: number }>`
  width: ${props => 'width' in props ? `${props.width}px` : defaultWidth };
`

export const Card = styled.div<{ noPadding?: boolean }>`
  border-radius: 12px;
  background-color: white;
  padding: ${props => props.noPadding ? 0 : 24}px;
`

export const Centered = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export function LoadingScreen({ className }: { className?: string }) {

  return (
      <Centered className={className}>
        <FontAwesomeIcon icon={faSpinner} spin />
      </Centered>
  )
}

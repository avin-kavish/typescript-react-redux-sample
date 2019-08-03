import styled from '@emotion/styled';
import {AlignItemsProperty, JustifyContentProperty} from 'csstype';

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

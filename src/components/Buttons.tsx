import React, {PropsWithChildren} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {theme} from '../styles';
import {darken} from 'polished';

type ButtonProps = PropsWithChildren<{
  icon?: IconProp
  style?: ButtonType
}> & Omit<JSX.IntrinsicElements['button'], 'style'>

type ButtonType = 'light' | 'primary'

export function Button({ icon, children, style = 'light', ...props }: ButtonProps) {

  return (
    <StyledButton {...props} buttonStyle={style}>
      {icon && <Icon icon={icon} buttonStyle={style} />}
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<{ buttonStyle: ButtonType }>`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.buttonStyle === 'light' ? '#ede8fc' : theme.blue};
  color: ${props => props.buttonStyle === 'light' ? 'black' : 'white'};
  cursor: pointer;
  transition: background-color 200ms ease;

  ${props => props.buttonStyle === 'primary' && css`;
    font-size: 18px;
    font-weight: 600;
  `}

  &:hover {
    background-color: ${props => props.buttonStyle === 'light'
    ?  darken(0.03, '#ede8fc')
    :  darken(0.05, theme.blue)};
  }
`

const Icon = styled<typeof FontAwesomeIcon, { buttonStyle: ButtonType }>(FontAwesomeIcon)`
  margin-right: 8px;
  font-size: 20px;
  color:${props => props.buttonStyle === 'light' ? theme.blue : 'white'};
`

export const UnstyledButton = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  cursor: pointer;
  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  /* Normalize \`line-height\`. Cannot be changed from \`normal\` in Firefox 4+. */
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable \`input\` types in iOS */
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`

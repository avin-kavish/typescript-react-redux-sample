import React, {PropsWithChildren} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {theme} from '../styles';

type ButtonProps = PropsWithChildren<{
  icon?: IconProp
  style?: ButtonType
}>

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
  padding: 12px 24px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.buttonStyle === 'light' ? '#ede8fc' : theme.blue};
  color: ${props => props.buttonStyle === 'light' ? 'black' : 'white'};
  cursor: pointer;
`

const Icon = styled<typeof FontAwesomeIcon, { buttonStyle: ButtonType }>(FontAwesomeIcon)`
  margin-right: 8px;
  font-size: 20px;
  color:${props => props.buttonStyle === 'light' ? theme.blue : 'white'};
`

import React, {PropsWithChildren} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {css} from '@emotion/core';
import styled from '@emotion/styled';

type ButtonProps = PropsWithChildren<{
  icon?: IconProp
  style?: ButtonType
}>


export function Button({ icon, children, style = 'light', ...props }: ButtonProps) {

  return (
    <ButtonEl {...props} buttonStyle={style}>
      {icon && <FontAwesomeIcon icon={icon} css={css`margin-right: 8px;`}/>}
      {children}
    </ButtonEl>
  )
}

type ButtonType = 'light' | 'primary'

const ButtonEl = styled.button<{ buttonStyle: ButtonType }>`
  padding: 12px 24px;
  border: 0;
  border-radius: 8px;
  background-color: ${props => props.buttonStyle === 'light' ? '#ede8fc' : '#018de5'};
  color: ${props => props.buttonStyle === 'light' ? 'black' : 'white'};
  cursor: pointer;
`

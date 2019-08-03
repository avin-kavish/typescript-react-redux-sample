import styled from '@emotion/styled';
import {css} from '@emotion/core';
import {theme} from '../styles';

const inputCss = css`
  padding: 16px 24px;
  font-size: 16px;
  border:1px solid ${theme.border.input};
  border-radius: 4px;
  background-color: #f7f8fc;
  min-width: 0;
  width: 100%;
`

export const InputBox = styled.input`
  ${inputCss};
`

export const SelectBox = styled.select`
  ${inputCss};
  appearance: none;

  &::-ms-expand {
    display: none;
  }
`


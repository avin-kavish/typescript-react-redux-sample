import {Button, FlexBox, FlexSpacer} from '../../components';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {css} from '@emotion/core';
import styled from '@emotion/styled';

export default function Header() {

  return (
      <FlexBox css={css`margin-bottom: 24px;`}>
        <H2>Custom Question Manager</H2>
        <FlexSpacer/>
        <Button icon={faPlusCircle}>
          Add New Question
        </Button>
      </FlexBox>
  )
}

const H2 = styled.h2`
  font-size: 30px;
`

import React from 'react';
import {FlexBox, FlexSpacer} from '../../components';
import {css} from '@emotion/core';
import {PageCount, Pager} from '../../components/Pagination';

export function ActionBar() {


  return (
      <FlexBox css={css`margin-top:12px;`}>
        <Pager />
        <FlexSpacer/>
        <PageCount/>
      </FlexBox>
  )
}

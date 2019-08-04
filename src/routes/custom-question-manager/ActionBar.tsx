import React from 'react';
import {FlexBox, FlexSpacer, PageCount, PageCountProps, Pager, PagerProps} from '../../components';
import {css} from '@emotion/core';
import {connect} from 'react-redux';
import {RootState} from '../../state/store';
import {changePage, changePerPage} from '../../state/questions';

type ActionBarProps = {
  pagerProps: PagerProps,
  pagerOnChange: (v: number) => void
  pageCountProps: PageCountProps,
  pageCountOnChange: (v: number) => void
}

function ActionBar({pagerProps, pagerOnChange, pageCountProps, pageCountOnChange}: ActionBarProps) {

  return (
      <FlexBox css={css`margin:12px 24px 0;`}>
        <Pager {...pagerProps} onChange={pagerOnChange}/>
        <FlexSpacer/>
        <PageCount {...pageCountProps} onChange={pageCountOnChange}/>
      </FlexBox>
  )
}

export default connect(({questions}: RootState) => ({
      pagerProps: {
        total: questions.total,
        perPage: questions.perPage,
        current: questions.page,
      },
      pageCountProps: {
        value: questions.perPage
      }
    }),
    dispatch => ({
      pagerOnChange: (newPage: number) => dispatch(changePage(newPage)),
      pageCountOnChange: (newPage: number) => dispatch(changePerPage(newPage)),
    }))(ActionBar)


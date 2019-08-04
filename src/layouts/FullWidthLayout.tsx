import styled from '@emotion/styled';
import React, {PropsWithChildren} from 'react';
import {Footer} from './Footer';
import {Header} from './Header';

export function FullWidthLayout({children}: PropsWithChildren<{}>) {

  return (
      <LayoutWrapper>
        <Header/>
        <Main>
          {children}
        </Main>
        <Footer/>
      </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  height: 100%;
  display:flex;
  flex-direction: column;
`

const Main = styled.main`
  padding: 40px;
  flex-grow: 1;
`

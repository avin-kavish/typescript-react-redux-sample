import styled from '@emotion/styled';
import logo from '../../assets/logo.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faBell} from '@fortawesome/free-solid-svg-icons';
import {css} from '@emotion/core';
import React, {PropsWithChildren} from 'react';
import {FlexSpacer} from '../components';

export function FullWidthLayout({children}: PropsWithChildren<{}>) {

  return (
      <LayoutWrapper>
        <Header/>
        <LayoutContent>
          {children}
        </LayoutContent>
      </LayoutWrapper>
  )
}

const LayoutWrapper = styled.div`
  height: 100%;
  display:flex;
  flex-direction: column;
`

const LayoutContent = styled.div`
  padding: 40px;
  flex-grow: 1;
`

function Header() {

  return (
      <HeaderEl>
        <Logo/>
        <FlexSpacer/>
        <HeaderItem noHover>
          <Notifications/>
        </HeaderItem>
        <HeaderItem>
          <Menu/>
        </HeaderItem>
      </HeaderEl>
  )
}

const HeaderEl = styled.header`
  background-color: #FEBF00;
  color:white;
  padding: 0 16px;
  display: flex;
  align-items: center;
`

const HeaderItem = styled.div<{ noHover?: boolean }>`
  padding: 12px 16px;
  transition: all 150ms ease;
  border-radius: 8px;

  ${props => !props.noHover && `&:hover {
    background-color: rgba(0,0,0,0.05);
  }`}
`

function Logo() {

  return (
      <LogoImg src={logo}/>
  )
}

const LogoImg = styled.img`
  max-width: 100%;
`

export function Notifications() {

  return (
      <FontAwesomeIcon
          icon={faBell}
          css={css`font-size: 22px;`}
      />
  )
}

function Menu() {

  return (
      <MenuToggle>
        Menu
        <FontAwesomeIcon
            icon={faBars}
            css={css`font-size:24px;margin-left:8px;`}
        />
      </MenuToggle>
  )
}

const MenuToggle = styled.div`
  display: flex;
  align-items: center;
  cursor:pointer;
`

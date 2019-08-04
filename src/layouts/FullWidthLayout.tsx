import styled from '@emotion/styled';
import logo from '../../assets/logo.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faBell, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {css} from '@emotion/core';
import React, {PropsWithChildren} from 'react';
import {FlexSpacer} from '../components';
import {Link, NavLink} from 'react-router-dom';
import {theme} from '../styles';

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
  background-color: ${theme.yellow};
  color:white;
  padding: 0 16px;
  display: flex;
  align-items: center;
`

const HeaderItem = styled.div<{ noHover?: boolean }>`
  padding: 12px 16px;
  transition: all 150ms ease;
  border-radius: 8px;
  cursor: ${props => props.noHover ? 'initial' : 'pointer'};

  ${props => !props.noHover && `&:hover {
    background-color: rgba(0,0,0,0.05);
  }`}
`

function Logo() {

  return (
      <NavLink to="/">
        <LogoImg src={logo}/>
      </NavLink>
  )
}

const LogoImg = styled.img`
  max-width: 100%;
`

export function Notifications() {

  return (
      <div css={css`position: relative;`}>
        <FontAwesomeIcon
            icon={faBell}
            css={css`font-size: 22px;`}
        />
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            css={css`position: absolute; top: 0; right: -5px; width:15px; height: 15px;`}
        >
          <circle
              cx="12"
              cy="12"
              r="12"
              fill="white"
          />
          <circle
              cx="12"
              cy="12"
              r="7"
              fill="#00d662"
          />
        </svg>
      </div>
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
  font-weight: 600;
`

function Footer() {

  return (
      <StyledFooter>
        <div>Copyright &copy; 2016-18, Simplifiya, LLC. All Rights Reserved.</div>
        <FlexSpacer/>
        <FooterLink to={''}>
          <FontAwesomeIcon icon={faInfoCircle}
                           css={css`margin-right: 8px;`}/>
          Privacy Policy
        </FooterLink>
        |
        <FooterLink to={''}>
          Term of Service
        </FooterLink>
        |
        <FooterLink to={''}>
          Help Center
        </FooterLink>
      </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  padding: 20px 40px 40px;
`

const FooterLink = styled(Link)`
  color: #41467e;
  text-decoration: none;
  padding: 0 12px;
`

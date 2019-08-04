import {FlexSpacer} from '../components';
import styled from '@emotion/styled';
import {headerItemCss, theme} from '../styles';
import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import {css} from '@emotion/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faBell} from '@fortawesome/free-solid-svg-icons';

export function Header() {

  return (
      <StyledHeader>
        <Logo/>
        <FlexSpacer/>
        <Notifications/>
        <Menu/>
      </StyledHeader>
  )
}

function Logo() {

  return (
      <NavLink to="/">
        <LogoImg src={logo}/>
      </NavLink>
  )
}

function Notifications() {

  return (
      <div css={headerItemCss(true)}>
        <div css={css`position: relative;`}>
          <FontAwesomeIcon
              icon={faBell}
              css={css`font-size: 22px;`}
          />
          <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              css={css`position: absolute; top: 0px; right: -6px; width:15px; height: 15px;`}
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
  ${headerItemCss()};
  display: flex;
  align-items: center;
  cursor:pointer;
  font-weight: 600;
`

const StyledHeader = styled.header`
  background-color: ${theme.yellow};
  color:white;
  padding: 0 16px;
  display: flex;
  align-items: center;
`

const LogoImg = styled.img`
  max-width: 100%;
`

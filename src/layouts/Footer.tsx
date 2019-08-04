import {FlexSpacer} from '../components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import React from 'react';

export function Footer() {

  return (
      <StyledFooter>
        <div>Copyright &copy; 2016-18, Simplifiya, LLC. All Rights Reserved.</div>
        <FlexSpacer/>
        <FooterLink to={''}>
          <FontAwesomeIcon
              icon={faInfoCircle}
              css={css`margin-right: 8px;`}
          />
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

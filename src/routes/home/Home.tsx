import React from 'react';
import {Button, Centered, Link} from '../../components';
import styled from '@emotion/styled';
import {routes} from '../routes';


export function Home() {
  return (
    <Centered>
      <Link.NoStyle to={routes.customQuestionManager}>
        <Button>Custom Question Manager</Button>
      </Link.NoStyle>
    </Centered>
  )
}


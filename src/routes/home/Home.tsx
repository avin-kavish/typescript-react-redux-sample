import React from 'react';
import {Button, Centered} from '../../components';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import {routes} from '../routes';


export function Home() {
  return (
    <Centered>
      <Link to={routes.customQuestionManager}>
      <Button>Custom Question Manager</Button>
      </Link>
    </Centered>
  )
}


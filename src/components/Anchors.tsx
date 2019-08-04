import styled from '@emotion/styled';
import {Link as RouterLink} from 'react-router-dom';

export const Link = {
  NoStyle: styled(RouterLink)`
    color: inherit;
    text-decoration: none;

    &:hover {
      color: inherit;
      text-decoration: none;
    }
  `
}

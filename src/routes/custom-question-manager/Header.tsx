import {Button, FlexBox, FlexSpacer} from '../../components';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export default function Header() {

  return (
      <FlexBox>
        <h2>Custom Question Manager</h2>
        <FlexSpacer/>
        <Button icon={faPlusCircle}>
          Add New Question
        </Button>
      </FlexBox>
  )
}

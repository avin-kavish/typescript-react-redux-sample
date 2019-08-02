import {Button, Card, Col, InputBox, Row} from '../../components';
import {css} from '@emotion/core';
import React from 'react';

export default function SearchBox() {

  return (
      <Card css={css`margin-bottom: 24px;`}>
        <Row css={css`margin-bottom: 12px;`}>
          <Col size={7}>
            <InputBox placeholder="Search by Question"/>
          </Col>
          <Col size={3}>
            <InputBox placeholder="License"/>
          </Col>
          <Col size={2}>
            <InputBox placeholder="All States"/>
          </Col>
        </Row>
        <Row>
          <Col size={3}>
            <InputBox placeholder="All Categories"/>
          </Col>
          <Col size={4}>
            <InputBox placeholder="Search By Question Group"/>
          </Col>
          <Col size={2}>
            <InputBox placeholder="Status"/>
          </Col>
          <Col grow>
            <InputBox placeholder="Display"/>
          </Col>
          <Col>
            <SearchButton/>
          </Col>
        </Row>
      </Card>
  )
}

const SearchButton = (props: any) => (
    <Button
        style="primary"
        css={css`height: 100%;width:100%;font-size: 18px; font-weight: 600;`}
    >
      Search
    </Button>
)

import {Button, Card, Col, InputBox, Row, SelectBox} from '../../components';
import {css} from '@emotion/core';
import React from 'react';
import {licences} from '../../data/licences';
import {Select, useManagedSelect, useSelect} from '../../components/Select';

export default function SearchBox() {
  const licenseProps = useManagedSelect({ initialValue: null, values: licences, labelFn: v => v, })
  const stateProps = useManagedSelect({ initialValue: null, values: [], labelFn: v => v })
  const categoryProps = useManagedSelect({ initialValue: null, values: [], labelFn: v => v })
  const statusProps = useManagedSelect({ initialValue: null, values: [], labelFn: v => v })
  const displayProps = useManagedSelect({ initialValue: null, values: [], labelFn: v => v })

  return (
      <Card css={css`margin-bottom: 24px;`}>
        <Row css={css`margin-bottom: 12px;`}>
          <Col size={7}>
            <InputBox placeholder="Search by Question"/>
          </Col>
          <Col size={3}>
            <Select {...licenseProps} placeholder="License" />
          </Col>
          <Col size={2}>
            <Select {...stateProps} placeholder="All States"/>
          </Col>
        </Row>
        <Row css={css`flex-wrap: nowrap;`}>
          <Col size={3}>
            <Select {...categoryProps} placeholder="All Categories"/>
          </Col>
          <Col size={4}>
            <InputBox placeholder="Search By Question Group"/>
          </Col>
          <Col grow shrink>
            <Select {...statusProps} placeholder="Status"/>
          </Col>
          <Col grow shrink>
            <Select {...displayProps} placeholder="Display"/>
          </Col>
          <Col>
            <SearchButton onClick={() => alert('no-op')}/>
          </Col>
        </Row>
      </Card>
  )
}

const SearchButton = (props: JSX.IntrinsicElements['button']) => (
    <Button
        {...props}
        style="primary"
        css={css`height: 100%;width:100%;font-size: 18px; font-weight: 600;`}
    >
      Search
    </Button>
)

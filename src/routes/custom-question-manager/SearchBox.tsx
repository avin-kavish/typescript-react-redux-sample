import {Button, Card, Col, InputBox, Row, Select, useManagedSelect} from '../../components';
import {css} from '@emotion/core';
import React, {useEffect, useState} from 'react';
import {SearchFilters, searchQuestions} from '../../state/questions';
import {connect} from 'react-redux';
import {fetchFilters, Filters} from '../../state/filters';
import {RootState} from '../../state/store';

type SearchBoxProps = {
  onSearchClick: (filters: SearchFilters) => void
  filters: Filters
  fetchFilters: () => void
}

function SearchBox({onSearchClick, filters, fetchFilters}: SearchBoxProps) {
  const selectProps = {
    license: useManagedSelect({initialValue: null, values: filters.license, labelFn: v => v}),
    state: useManagedSelect({initialValue: null, values: filters.state, labelFn: v => v}),
    category: useManagedSelect({initialValue: null, values: filters.category, labelFn: v => v}),
    status: useManagedSelect({initialValue: null, values: filters.status, labelFn: v => v}),
    display: useManagedSelect({initialValue: null, values: filters.display, labelFn: v => v})
  }
  const [question, set] = useState('')

  useEffect(() => {
    fetchFilters()
  }, [])

  const submitForm: JSX.IntrinsicElements['form']['onSubmit'] = e => {
    e.preventDefault()
    const filters: SearchFilters = Object.entries(selectProps).reduce((acc, [key, props]) => {
      if (props.value)
        acc[key] = props.value.value
      return acc
    }, {})
    if (question)
      filters.question = question
    onSearchClick(filters)
  }

  return (
      <Card css={css`margin-bottom: 24px;`}>
        <form onSubmit={submitForm}>
          <Row css={css`margin-bottom: 12px;`}>
            <Col size={7}>
              <InputBox
                  placeholder="Search by Question"
                  value={question}
                  onChange={e => set(e.target.value)}
              />
            </Col>
            <Col size={3}>
              <Select {...selectProps.license} placeholder="License"/>
            </Col>
            <Col size={2}>
              <Select {...selectProps.state} placeholder="All States"/>
            </Col>
          </Row>
          <Row css={css`flex-wrap: nowrap;`}>
            <Col size={3}>
              <Select {...selectProps.category} placeholder="All Categories"/>
            </Col>
            <Col size={4}>
              <InputBox
                  placeholder="Search By Question Group"
                  disabled
              />
            </Col>
            <Col
                grow
                shrink
            >
              <Select {...selectProps.status} placeholder="Status"/>
            </Col>
            <Col
                grow
                shrink
            >
              <Select {...selectProps.display} placeholder="Display"/>
            </Col>
            <Col>
              <SearchButton
                  type="submit"
              />
            </Col>
          </Row>
        </form>
      </Card>
  )
}

export default connect(
    (state: RootState) => ({ filters: state.filters }),
    dispatch => ({
      onSearchClick: (payload: SearchFilters) => dispatch(searchQuestions(payload)),
      fetchFilters: () => dispatch(fetchFilters.request())
    })
)(SearchBox)

const SearchButton = (props: JSX.IntrinsicElements['button']) => (
    <Button
        {...props}
        style="primary"
        css={css`height: 100%;width:100%;font-size: 18px; font-weight: 600;`}
    >
      Search
    </Button>
)

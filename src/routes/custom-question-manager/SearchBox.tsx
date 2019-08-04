import {Button, Card, Col, InputBox, Row} from '../../components';
import {css} from '@emotion/core';
import React, {useEffect} from 'react';
import {SearchFilters, searchQuestions} from '../../state/questions';
import {connect} from 'react-redux';
import {fetchFilters} from '../../state/filters';
import Select from './ConnectedSelect';
import {useFormState} from 'react-use-form-state';

type SearchBoxProps = {
  onSearchClick: (filters: SearchFilters) => void
  fetchFilters: () => void
}

export default connect(
    null,
    dispatch => ({
      onSearchClick: (payload: SearchFilters) => dispatch(searchQuestions(payload)),
      fetchFilters: () => dispatch(fetchFilters.request())
    })
)(SearchBox)

function SearchBox({onSearchClick, fetchFilters}: SearchBoxProps) {
  const [
    {values},
    {text, raw}
  ] = useFormState({license: null, state: null, category: null, status: null, display: null, question: ''})

  useEffect(() => {
    fetchFilters()
  }, [])

  const submitForm: JSX.IntrinsicElements['form']['onSubmit'] = e => {
    e.preventDefault()
    const filters = {...values}
    Object.keys(filters).forEach(key => (filters[key] === null || filters[key] === undefined) && delete filters[key])
    onSearchClick(filters)
  }

  return (
      <Card css={css`margin-bottom: 24px;`}>
        <form onSubmit={submitForm}>
          <Row css={css`margin-bottom: 12px;`}>
            <Col size={7}>
              <InputBox
                  {...text('question')}
                  placeholder="Search by Question"
              />
            </Col>
            <Col size={3}>
              <Select.License {...raw('license')} />
            </Col>
            <Col size={2}>
              <Select.State {...raw('state')} />
            </Col>
          </Row>
          <Row css={css`flex-wrap: nowrap;`}>
            <Col size={3}>
              <Select.Category {...raw('category')} />
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
              <Select.Status {...raw('status')} />
            </Col>
            <Col
                grow
                shrink
            >
              <Select.Display {...raw('display')} />
            </Col>
            <Col>
              <SearchButton type="submit"/>
            </Col>
          </Row>
        </form>
      </Card>
  )
}

const SearchButton = (props: JSX.IntrinsicElements['button']) => (
    <Button
        {...props}
        style="primary"
        css={css`height: 100%;width:100%;`}
    >
      Search
    </Button>
)

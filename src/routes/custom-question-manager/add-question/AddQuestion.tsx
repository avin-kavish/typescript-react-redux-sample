import React, {useEffect, useState} from 'react';
import {Button, Card, Col, FlexBox, FlexSpacer, FormGroup, InputBox, Row, Spacer} from '../../../components';
import {css} from '@emotion/core';
import {Question} from '../../../data/questions';
import {Intrinsics} from '../../../utilities';
import {useFormState} from 'react-use-form-state';
import {connect} from 'react-redux';
import {questionsCrud} from '../../../state/questions';
import Select from '../ConnectedSelect'
import styled from '@emotion/styled';
import {fetchFilters} from '../../../state/filters';

type AddQuestionProps = {
  addQuestion: (question: Partial<Question>) => void
  fetchFilters: () => void
}

export default connect(
    null,
    dispatch => ({
      addQuestion: (question: Question) => dispatch(questionsCrud.create(question)),
      fetchFilters: () => dispatch(fetchFilters.request())
    })
)(AddQuestion)

function AddQuestion({addQuestion, fetchFilters}: AddQuestionProps) {
  const [{values, touched, validity}, {text, raw}] = useFormState({question: '', license: null, category: null, state: null, status: null})
  const [isValid, setValidity] = useState(true)

  useEffect(() => {
    fetchFilters()
  }, [])

  const validateAndDispatch = (display: string) => {
    const isValid = Object.values(values).reduce((acc, v) => acc && !!v, true)
    if (isValid)
      addQuestion({...values, display})

    setValidity(isValid)
  }

  const handleSubmit: Intrinsics['form']['onSubmit'] = event => {
    event.preventDefault()
    validateAndDispatch('Published')
  }

  const saveDraft: Intrinsics['button']['onClick'] = event => {
    validateAndDispatch('Draft')
  }

  return (
      <Card>
        <Heading>Add Question</Heading>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <InputBox
                {...text('question')}
                placeholder="Question"
                required
            />
          </FormGroup>
          <FormGroup>
            <Select.License {...raw('license')} />
          </FormGroup>
          <FormGroup>
            <Row>
              <Col size={6}>
                <Select.Category {...raw('category')} />
              </Col>
              <Col size={6}>
                <Select.State {...raw('state')} />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Select.Status {...raw('status')} />
          </FormGroup>
          <FormGroup>
            {!isValid && <span css={css`color: crimson;`}>*All fields are required</span>}
          </FormGroup>
          <FlexBox
              alignItems="stretch"
              css={css`margin-top: 16px;`}
          >
            <FlexSpacer/>
            <Button
                style="light"
                type="button"
                onClick={saveDraft}
            >
              Save Draft
            </Button>
            <Spacer width={16}/>
            <Button
                style="primary"
                type="submit"
            >
              Publish
            </Button>
          </FlexBox>
        </form>
      </Card>
  )
}

const Heading = styled.h2`
margin-bottom: 16px;
`

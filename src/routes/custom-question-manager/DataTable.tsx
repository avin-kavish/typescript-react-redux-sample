import {Question, questionCols, questions} from '../../data/questions'
import styled from '@emotion/styled'
import Popup from 'reactjs-popup'
import {theme} from '../../styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faEllipsisH, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {css} from '@emotion/core'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import {FlexBox} from '../../components'
import {Table} from '../../components/Table'
import { connect } from 'react-redux'
import {RootState} from '../../state/store';

type DataTableProps = {
  questions: Question[]
}

function DataTable({ questions }: DataTableProps) {

  return (
      <Table
          columns={questionCols}
          data={questions}
          render={renderRow}
      />
  )
}

export default connect((state: RootState) => ({ questions: state.questions.questions }))(DataTable)

const renderRow = (data: Question) => (
    <tr>
      <td>{data.id}</td>
      <td>{data.question}</td>
      <td>{data.category}</td>
      <td>{data.state}</td>
      <td>
        <ViewPopup>
          {<div>{data.questionGroup.join('\n')}</div>}
        </ViewPopup>
      </td>
      <td>
        <ViewPopup>
          {<div>{data.license.join('\n')}</div>}
        </ViewPopup>
      </td>
      <td>{data.status}</td>
      <td><DisplayType display={data.display}/></td>
      <td><ActionMenu/></td>
    </tr>
)

const DisplayType = styled(({display, ...props}) => <div {...props}>{display}</div>)`
  padding: 6px 12px;
  border-radius:4px;
  text-align: center;
  font-weight: 500;
  color: #fefdfb;
  background-color: ${props => props.display === 'Draft'
    ? '#b9c2cb'
    : props.display === 'Published'
        ? '#42be5c'
        : 'transparent'
    };
`


function ViewPopup({children}: { children: JSX.Element }) {

  return (
      <Popup
          trigger={<Anchor>View</Anchor>}
          on={'click'}
          contentStyle={{
            width: 'auto',
            borderRadius: 6,
            borderColor: theme.border.popup,
            whiteSpace: 'pre',
            fontSize: '13px',
            padding: 16,
            lineHeight: '20px'
          }}
      >
        {children}
      </Popup>
  )
}

const Anchor = styled.a`
  color: ${theme.text.anchor};
  cursor:pointer;

  &:hover {
     color: ${theme.text.anchor};
     text-decoration: none;
  }
`

function ActionMenu() {

  return (
      <Popup
          trigger={<FontAwesomeIcon
              icon={faEllipsisH}
              css={css`color:#afbcc5;cursor: pointer;`}
          />}
          contentStyle={{padding: 12, borderColor: theme.border.popup, borderRadius: 6, width: 'auto'}}
          position="bottom right"
          arrow={false}
      >
        <div>
          <MenuItem
              icon={faEye}
              label="View"
              onClick={() => void 0}
          />
          <MenuItem
              icon={faCheckCircle}
              label="Deactivate"
              onClick={() => void 0}
          />
          <Spacer/>
          <MenuItem
              icon={faPlus}
              label="Add to Group"
              onClick={() => void 0}
          />
          <MenuItem
              icon={faTrash}
              label="Delete"
              onClick={() => void 0}
          />
        </div>
      </Popup>
  )
}

type MenuItemProps = {
  icon: IconProp
  label: string
  onClick: React.MouseEventHandler
}

function MenuItem({icon, label, onClick}: MenuItemProps) {

  return (
      <ItemWrapper onClick={onClick}>
        <FontAwesomeIcon
            icon={icon}
            css={css`color:#babfc5;margin-right: 12px;`}
        />
        <Label>{label}</Label>
      </ItemWrapper>
  )
}

const ItemWrapper = styled(FlexBox)`
  padding: 8px;
  transition: background-color 300ms ease;
  cursor:default;
  border-radius: 6px;

  &:hover {
    background-color: #eff4f8;
  }
`

const Label = styled.span`
  font-size: 14px;
`

const Spacer = styled.div`
  margin-top: 8px;
`

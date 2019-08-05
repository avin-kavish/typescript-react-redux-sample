import {Question, questionCols} from '../../data/questions'
import styled from '@emotion/styled'
import Popup from 'reactjs-popup'
import {theme} from '../../styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faEllipsisH, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {css} from '@emotion/core'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import React, {useEffect, useState} from 'react'
import {FlexBox, LoadingScreen, Table} from '../../components'
import {connect} from 'react-redux'
import {RootState} from '../../state/store';
import {beginFetch, questionsCRUD, sortQuestions, SortType} from '../../state/questions';
import {safeJoin} from '../../utilities';

type DataTableProps = {
  questions: Question[]
  isLoading: boolean
  sort: SortType
  onSortClick: (value: SortType) => void
  refresh: () => void
  onDeleteClick: (value: Question) => void
}

export default connect(
    ({questions}: RootState) => ({
      questions: questions.questions,
      isLoading: questions.isLoading,
      sort: questions.sort
    }),
    dispatch => ({
      onSortClick: (value: SortType) => dispatch(sortQuestions(value)),
      onDeleteClick: (value: Question) => dispatch(questionsCRUD.delete(value)),
      refresh: () => dispatch(beginFetch({}))
    })
)(DataTable)

function DataTable({questions, onSortClick, onDeleteClick, refresh, sort, isLoading}: DataTableProps) {
  useEffect(() => {
    refresh()
  }, ['hot'])

  return (
      <div css={css`position:relative;`}>
        <Table
            columns={questionCols}
            data={questions}
            onSortClick={onSortClick}
            render={RenderRowFactory(onDeleteClick)}
            sort={sort}
        />
        {isLoading && LoadingOverlay}
      </div>
  )
}

const RenderRowFactory = (onDeleteClick: (value: Question) => void) => (data: Question) => (
    <tr key={data.id}>
      <td>{data.id}</td>
      <td css={css`width: 100%;`}>{data.question}</td>
      <td css={css`white-space: nowrap;`}>{data.category}</td>
      <td>{data.state}</td>
      <td>
        <ViewPopup>
          {<div>{safeJoin(data.questionGroup)}</div>}
        </ViewPopup>
      </td>
      <td>
        <ViewPopup>
          {<div>{safeJoin(data.license)}</div>}
        </ViewPopup>
      </td>
      <td>{data.status}</td>
      <td>
        <DisplayType display={data.display}/>
      </td>
      <td>
        <ActionMenu onDeleteClick={() => onDeleteClick(data)}/>
      </td>
    </tr>
)

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

type ActionMenuProps = {
  onDeleteClick: () => void
}

function ActionMenu({onDeleteClick}: ActionMenuProps) {
  const [isOpen, set] = useState(false)

  const handleDelete = () => { onDeleteClick(); set(false) }
  return (
      <Popup
          trigger={<div onClick={() => set(!isOpen)}>
            <FontAwesomeIcon
                icon={faEllipsisH}
                css={css`color:#afbcc5;cursor: pointer;`}
            />
          </div>}
          contentStyle={{padding: 12, borderColor: theme.border.popup, borderRadius: 6, width: 'auto'}}
          position="bottom right"
          arrow={false}
          closeOnDocumentClick
          open={isOpen}
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
              onClick={handleDelete}
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

const LoadingOverlay = (
    <LoadingScreen
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          font-size: 38px;
          background-color: rgba(255, 255, 255, 0.4);
        `}
    />
)

const DisplayType = styled(({display, ...props}) => <div {...props}>{display}</div>)`
  padding: 6px 12px;
  border-radius:4px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #fefdfb;
  background-color: ${props => props.display === 'Draft'
    ? '#b9c2cb'
    : props.display === 'Published'
        ? '#42be5c'
        : 'transparent'
    };
`


const Anchor = styled.a`
  color: ${theme.text.anchor};
  cursor:pointer;

  &:hover {
     color: ${theme.text.anchor};
     text-decoration: none;
  }
`

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

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {css} from '@emotion/core'
import React, {useCallback, useMemo, useState} from 'react'
import {theme} from '../styles';
import styled from '@emotion/styled';

export type LabelValue<T> = { label: string, value: T }

type SelectProps<T = any> = {
  isOpen: boolean
  onMenuToggle: (isOpen: boolean) => void
  value: LabelValue<T>
  onChange: (labelValue: LabelValue<T>) => void
  values: LabelValue<T>[]
  editable?: boolean
  placeholder?: string
}

type useManagedSelectParam<T> = {
  values: T[]
  initialValue: T
  labelFn: (value: T) => string
}

export function useManagedSelect<T>({values, initialValue = null, labelFn}: useManagedSelectParam<T>) {
  const [isOpen, toggle] = useState(false)
  const [value, onChange] = useState<LabelValue<T>>(initialValue
      ? {label: labelFn(initialValue), value: initialValue}
      : null)

  const labelValues = useMemo(() => values.map(v => ({label: labelFn(v), value: v})), [values])

  return {isOpen, onMenuToggle: toggle, value, onChange, values: labelValues}
}

type useSelectOptions<T> = {
  value: T
  values: T[]
  labelFn: (value: T) => string
  onChange: (value: T) => void
}

export function useSelect<T>({value, values, labelFn, onChange}: useSelectOptions<T>) {
  const [isOpen, toggle] = useState(false)

  return {
    isOpen,
    onMenuToggle: toggle,
    value: useMemo(() => ({label: labelFn(value), value}), [values]),
    onChange: useCallback((labelValue: LabelValue<T>) => onChange(labelValue.value), [onChange]),
    values: useMemo(() => values.map(v => ({label: labelFn(v), value: v})), [values])
  }
}

export function Select<T>({isOpen, onMenuToggle, value, onChange, values, placeholder = '', editable = true}: SelectProps<T>) {

  return (
      <SelectWrapper isOpen={isOpen}>
        <SelectValue>{value ? value.label : <span>{placeholder}</span>}</SelectValue>
        {editable && <DropdownToggle onClick={() => onMenuToggle(!isOpen)}>
            <DropdownIcon
                icon={faChevronDown}
                style={{transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)'}}
            />
        </DropdownToggle>}
        {isOpen && <Dropdown>
          {values && values.length
              ? values.map(v => (
                  <DropdownItem
                      onClick={() => {
                        onChange(v)
                        onMenuToggle(false)
                      }}
                      key={v.label}
                  >
                    {v.label}
                  </DropdownItem>
              ))
              : <NoItems />
          }
        </Dropdown>}
      </SelectWrapper>
  )
}

const SelectWrapper = styled.div<{ isOpen: boolean }>`
  position:relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid ${theme.border.input};
  background-color: ${theme.background.input};
  padding: 8px 0;

  border-radius: 4px;
  border-bottom-left-radius: ${props => props.isOpen && 0};
  border-bottom-right-radius: ${props => props.isOpen && 0};
`

const SelectValue = styled.div`
  min-width: 32px;
  flex-grow: 1;
  margin: 0 16px 0 24px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
`

const Dropdown = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  width: calc(100% + 2px);
  margin-left: -1px;
  margin-right: -1px;
  max-height: ${38 * 5}px;
  top:100%;

  border: 1px solid ${theme.border.input};
  border-top: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  background: white;

  z-index: 1000;
`

const hoverCss = css`
  transition: background-color 200ms ease;
  &:hover {
    background-color: #f6f6f6;
  }
`

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  ${hoverCss};
`

const DropdownToggle = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  ${hoverCss};
`

const DropdownIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  transition: transform 200ms ease;
  color: #7e8caf;
`

const NoItems = styled(props => <div {...props}>No Items</div>)`
  padding: 8px 12px;
  font-size: 12px;
  text-align: center;
`

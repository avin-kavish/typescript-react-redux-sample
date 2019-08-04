import React from 'react';
import {Select, useSelect} from '../../components';
import {connect} from 'react-redux';
import {RootState} from '../../state/store';

type SelectProps<T = string> = {
  value: T
  values: T[]
  onChange: (value: T) => void
  placeholder: string
}

function ConnectableSelect({values, value, onChange, placeholder}: SelectProps) {
  const props = useSelect({values, value, onChange, labelFn: v => v})

  return (
      <Select
          {...props}
          placeholder={placeholder}
      />
  )
}

export default {
  License: connect(
      (state: RootState) => ({
        values: state.filters.license,
        placeholder: 'License'
      })
  )(ConnectableSelect),
  State: connect(
      (state: RootState) => ({
        values: state.filters.state,
        placeholder: 'All States'
      })
  )(ConnectableSelect),
  Category: connect(
      (state: RootState) => ({
        values: state.filters.category,
        placeholder: 'All Categories'
      })
  )(ConnectableSelect),
  Status: connect(
      (state: RootState) => ({
        values: state.filters.status,
        placeholder: 'Status'
      })
  )(ConnectableSelect),
  Display: connect(
      (state: RootState) => ({
        values: state.filters.display,
        placeholder: 'Display'
      })
  )(ConnectableSelect),
}





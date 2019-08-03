import styled from '@emotion/styled';

const defaults = {
  gutter: 30,
  columns: 12
}

const halfGutter = defaults.gutter / 2

export const Row = styled.div<{ gutter?: number }>`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${props => props.gutter ? -props.gutter / 2 : -halfGutter}px;
  margin-right:  ${props => props.gutter ? -props.gutter / 2 : -halfGutter}px;
`

export const Col = styled.div<{ grow?: boolean, shrink?: boolean, size?: number }>`
  padding-left: ${halfGutter}px;
  padding-right: ${halfGutter}px;
  flex-grow: ${props => props.grow ? 1 : 0};
  flex-shrink: ${props => props.shrink ? 1 : 0};
  flex-basis: ${props => props.size ? percentage(props.size / defaults.columns) : 'auto'};
  max-width: ${props => props.size ? percentage(props.size / defaults.columns) :  '100%'};
`

const percentage = (value: number) => `${value * 100}%`

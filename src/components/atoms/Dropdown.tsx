import * as React from "react"
import styled from 'styled-components'

interface InputItem {
  value?: string
  text: string
}

interface DropdownProps{
  items?: InputItem[]
}

const StyledSelect = styled.select`
  height: 2rem;
  width: 18rem;
  
`

const Dropdown = React.forwardRef((props:DropdownProps, ref:React.Ref<HTMLSelectElement>) => {
  const Items: InputItem[] = props.items
  return(
    <>
      <StyledSelect ref={ref}>
        {Items.map((item: InputItem) => {
          const text = item.text
          const value = item.value || text
          return (
            <option value={value} key={value}>
              {text}
            </option>
          )
        })}
      </StyledSelect>
    </>
  )
})


export default Dropdown
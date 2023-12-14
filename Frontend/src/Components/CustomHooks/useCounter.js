import React,{useEffect} from 'react'

export const useCounter = (props) => {
    useEffect(()=>{
        document.title=props +'hits on button'
    })
  return (
    <div>useCounter</div>
  )
}

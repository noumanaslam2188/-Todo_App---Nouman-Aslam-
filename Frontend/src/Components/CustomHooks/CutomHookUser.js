import React,{useState} from 'react'
import { useCounter } from './useCounter'

export const CutomHookUser = () => {
    const [count,setCount] =useState(0)

    useCounter(count)
  return (
    <div>CutomHookUser
        {count}
        <button onClick={()=>setCount(count+1)}>Counter</button>
    </div>
  )
}

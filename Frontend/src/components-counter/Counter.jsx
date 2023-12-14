import React,{useState,useEffect} from 'react'

export const Counter = () => {
const [count,setCount]=useState(0)


 useEffect (()=>{
    console.log('parent rendering')
},[count])

const addcount=()=>{
    setCount(count+1)
}

const minuscount=() =>{
    setCount(count-1)
}

  return (
    <div className='thisdiv'>
        {count}
        <button onClick={addcount}> Add</button>
        <button onClick={minuscount}>Subtract</button>
    </div>
  )
}

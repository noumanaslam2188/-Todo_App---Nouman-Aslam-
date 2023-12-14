import React from 'react'
import Button from 'react-bootstrap/Button';


export const InputChild = ({ value, getValue, addinputtoList, saveUpdate,show }) => {


  return (
    <div>

      <input className='inputfiled' placeholder="Enter Name of list" value={value} onChange={(e) => getValue(e.target.value)}></input>
    
    {show &&  <Button variant="primary" className='add-tasks' onClick={addinputtoList}>Add Task</Button>}
    
     {!show &&  <Button variant="success" onClick={saveUpdate} >Update</Button>}

    </div>
  )
}

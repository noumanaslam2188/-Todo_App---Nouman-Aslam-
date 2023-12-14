import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
// import DatePicker from 'react-date-picker';


export const ListmapChild = ({ todo, deleteit, edit, openComment, cdelete, cedit, getendDate, todoid, comment }) => {
  let i = 1;
  return (
    <>
      <div className='mydiv'>
        {

          todo.map((myid, index) => (
            <div className='listdiv'>
              <ul className='dynamic-list' key={myid._id}>

                <li onClick={() => openComment(myid._id)} className='listt'>
                  {index + 1} . {myid.name} {myid.input}
                </li>


                <Button
                  className='dbutton'
                  variant='outline-danger'
                  onClick={() => deleteit(myid._id)}
                >
                  Delete
                </Button>

                <Button
                  className='ebutton'
                  variant='outline-info'
                  onClick={() => edit(myid._id)}
                >
                  Edit
                </Button>

              </ul>
            </div>
          ))

        }

      </div>


      <div className='cmnt-list'>
        {
          comment.map((myid) => (
            todoid === myid.todo_id ? (
              <div className='subtaskss' key={myid._id}>
                <ul>
                  <div className='subitems'>
                    <li className='li-cmnt'>
                      {myid.name}
                      {myid.commentsinput}
                      <span></span>
                      {new Date(myid.create_date).toLocaleDateString()}
                      <span></span>
                      {new Date(myid.update_date).toLocaleDateString()}
                      {(() => {
                        let status = 'upcoming';
                        const currentDate = Date.now();
                        const eDateInMilliSeconds = Date.parse(myid.create_edate);

                        if (eDateInMilliSeconds > currentDate) {
                          status = 'Upcoming';
                        } else if (eDateInMilliSeconds < currentDate) {
                          status = 'Due';
                        }

                        return <div><span></span> {status}</div>;
                      })()}
                  <button className='cdelete' onClick={() => cdelete(myid._id,)}>Delete</button>
                  <button className='cedit' onClick={() => cedit(myid._id)}>Edit</button>
                  </li>
                  </div>
                </ul>
              </div>
            ) : null
          ))};

      </div>


    </>
  );

};



























{/* {
            
            comment.map((myid)=>(
      <div className='subtasklist'>
            <ul >
                {todoid===myid.id? myid.comment.map((comment) => ( 
                  <li className='subitems' key={comment.cid}>
                    
                    {comment.text} <span></span>
                    {comment.sdate}<span></span>
                    {comment.edate}<span></span>
                    {comment.cstatus}
                    <button className='cdelete' onClick={() => cdelete(myid.id, comment.cid)}>Delete</button>
                    <button className='cedit' onClick={() => cedit(myid.id, comment.cid)}>Edit</button>
                    
                  </li>
                  
                )):''}
              </ul>
   

              </div>
              

))

} */}
import React from 'react'
import Button from 'react-bootstrap/Button';

export const CommentsInput = ({ inputstartdate, commentinputvalue, getCommentinput,
  showcomment, addcomment, commentsaveUpdate, showcupdate, getstartdate, getendDate, addInputToComment }) => {

  return (
    <div className='cinput'>
      <div>
        {showcomment && <input className='comments-input' type='text' placeholder='Add Subtask' value={commentinputvalue}
          onChange={(e) => getCommentinput(e.target.value)}></input>}
        {
          showcomment && <input className='sDate' type='date' onChange={(e) => getstartdate(e.target.value)}
          ></input>
        }

        {showcomment && <input className='eDate' type='date' onChange={(e) => getendDate(e.target.value)}
        ></input>}
        {showcomment && showcupdate && <Button variant="success" onClick={commentsaveUpdate} >Update</Button>}
        {showcomment && !showcupdate && <Button variant="info"  onClick={addcomment}>Add Comment</Button>}



      </div>
    </div>
  )
}

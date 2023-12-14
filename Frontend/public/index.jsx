import React, { useState, useEffect, useContext } from 'react'
import { InputChild } from './InputChild'
import { ListmapChild } from './ListmapChild'
import uuid from 'react-uuid'
import { CommentsInput } from './CommentsInput'
import { useContextMode } from './MyContext'


const getLocalData = () => {
    let list = localStorage.getItem('list')

    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}


// const getSDate=()=>{
//     const storedDate = localStorage.getItem('sdate');

//         // Update state with the stored date
//         if (storedDate) {
//           new Date(JSON.parse(storedDate));
//         }else{
//             return []
//         }
// }

export const TodoLists = () => {
    let [input, setInput] = useState('')
    const {todo,setTodo}=useContextMode()

    // const [todo, setTodo] = useState(getLocalData())
    const [key, setKey] = useState(0)
    const [show, setShow] = useState(true)
    const [showcomment, setShowcomment] = useState(false)
    const [commentsinput, setCommentinput] = useState('')
    const [todoid, setTodoid] = useState(0)
    const [showcupdate, setshowCpdate] = useState(false)
    const [ckey, setCkey] = useState(0)
    const [startdate, setStartdate] = useState()
    const [enddate, setEnddate] = useState()
    const id = uuid()



    // console.log(commentsinput)
    console.log(todo)

    //Local Data storage

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(todo))
    }, [todo])


    // useEffect(() => {
    //   
    //     const storedDate = localStorage.getItem('sdate');

    //     
    //     if (storedDate) {
    //       setStartdate(storedDate);
    //     }
    //   }, []);



    //Input Functions

    const getstartdate = (inputstartdate) => {
        setStartdate(inputstartdate)
    }


    const getendDate = (inputenddate) => {
        setEnddate(inputenddate)
        localStorage.setItem('sdate', inputenddate)

    }

    const getCommentinput = (commentinputvalue) => {
        setCommentinput(commentinputvalue)
    }


    const getValue = (value) => {
        setInput(value)
    }



    const addinputtoList = () => {
        const updated = [...todo]
        const myid = {
            input: input,
            id: id,
            comment: []
        }
        setTodo([...updated, myid])
        setInput('')

    }





    const deleteit = (id) => {
        console.log()
        let updated = [...todo]
        let deleteitem = updated.findIndex((element) => element.id === id)
        const deletedvalue = updated.splice(deleteitem, 1)
        setTodo([...updated])

    }




    const edit = (id) => {
        setShow(false)
        const updated = [...todo]
        const editelement = updated.findIndex((element) => element.id === id)
        setKey(editelement)
        setInput(updated[editelement].input)

    }

    const saveUpdate = () => {
        setShow(true)
        const updated = [...todo]
        updated[key].input = input
        setTodo([...updated])
        setInput('')
    }

    const openComment = (id) => {
        setTodoid(id)
        // const updated=[...todo]
        setShowcomment(!showcomment)
    }

    const addcomment = () => {
        // console.log(todoid)
        console.log('start date : ' + startdate)

        const todoindex = todo.findIndex((element) => element.id === todoid)
        const existingComment = todo[todoindex].comment
        let status = 'upcomming'

        let currentDate = Date.now()

        const sDateInMilliSeconds = Date.parse(startdate);
        const eDateInMilliSeconds = Date.parse(enddate);

        if (eDateInMilliSeconds > currentDate) {
            status = 'Upcomming'
        } else if (eDateInMilliSeconds < currentDate) {
            status = 'Due'
        }
        const updatedcomment = [...existingComment,
        { cid: uuid(), text: commentsinput, sdate: startdate, edate: enddate, cstatus: status }]
        console.log(updatedcomment)
        setCommentinput('')

        const updatedtodo = todo.reduce((acc, item) => {
            if (item.id === todoid) {
                acc.push({ ...item, comment: updatedcomment })
            } else {
                acc.push(item)
            }
            return acc;
        }, [])
        // setStartdate('')
        setStartdate('')
        setEnddate('')
        setTodo(updatedtodo)


    }
    //comment functions



    const deleteComment = (id, cid) => {
        const todoIndex = todo.findIndex((element) => element.id === id);

        const updatedTodo = [...todo];

        const commentIndex = updatedTodo[todoIndex].comment.findIndex(
            (element) => element.cid === cid
        );

        updatedTodo[todoIndex].comment.splice(commentIndex, 1);
        setTodo(updatedTodo);

    };


    const editComment = (id, cid) => {
        const todoIndex = todo.findIndex((element) => element.id === id);


        const updatedTodo = [...todo];

        const commentIndex = updatedTodo[todoIndex].comment.findIndex(
            (element) => element.cid === cid
        );

        setCkey(commentIndex)

        const existingText = updatedTodo[todoIndex].comment[commentIndex].text;

        const startingDate = updatedTodo[todoIndex].comment[commentIndex].sdate;

        const endingDate = updatedTodo[todoIndex].comment[commentIndex].edate;




        setCommentinput(existingText)
        setStartdate(startingDate)
        setEnddate(endingDate)
        // setStartdate(existingDate.split('T')[0]);
        // setStartdate(existingDate.toISOString().split('T')[0]);



        setshowCpdate(true);

    };

    const commentsaveUpdate = () => {

        const updated = [...todo];
        const todoindex = updated.findIndex((element) => element.id === todoid)
        updated[todoindex].comment[ckey].text = commentsinput;
        updated[todoindex].comment[ckey].sdate = startdate;
        updated[todoindex].comment[ckey].edate = enddate;

        setTodo(updated);
        setshowCpdate(false)
        setCommentinput('');

    }

    const addsdate = () => {
        const updatedTodo = [...todo];
        const todoIndex = updatedTodo.findIndex((element) => element.id === id);


        const commentIndex = updatedTodo[todoIndex].comment.findIndex(
            (element) => element.cid === todoid
        );
        console.log(commentIndex);
        updatedTodo[todoIndex].comment[commentIndex].sdate = startdate;

        setTodo([...updatedTodo]);
    };


    const addedate = (id, cid) => {
        console.log("addsrate");
        const updatedTodo = [...todo];
        const todoIndex = updatedTodo.findIndex((element) => element.id === id);


        const commentIndex = updatedTodo[todoIndex].comment.findIndex(
            (element) => element.cid === cid
        );
        console.log(commentIndex);
        updatedTodo[todoIndex].comment[commentIndex].sdate = startdate;

        setTodo([...updatedTodo]);
    };
    return (
        <div className='main-div'>

            <InputChild value={input} getValue={getValue} addinputtoList={addinputtoList} show={show} saveUpdate={saveUpdate}></InputChild>


            <CommentsInput
                commentinputvalue={commentsinput}
                getCommentinput={getCommentinput}
                showcomment={showcomment}
                addcomment={addcomment}
                commentsaveUpdate={commentsaveUpdate}
                showcupdate={showcupdate}
                getstartdate={getstartdate}
                getendDate={getendDate}
                inputstartdate={startdate}

            ></CommentsInput>

            <ListmapChild
                todo={todo}
                deleteit={deleteit}
                edit={edit}
                openComment={openComment}
                cdelete={deleteComment}
                cedit={editComment}
                getendDate={getendDate}

            >
                <div><h1>jiyyug</h1></div>

            </ListmapChild>


            

        </div>
    )
}



















































// const [task,setTask] = useState("")
// const [todo,setTodo]=useState([])

// const handleinputChange=(e)=>{
//     setTask(e.target.value)
// }

// //add input to list
// const tasktoList=()=>{
//     setTodo([...todo,task])
// }

// return (
// <div>
//     <input type='text' value={task} onChange={handleinputChange}></input>
//     <button onClick={tasktoList}>Add Task</button>

//     <ul>
//         {todo.map((todos,index)=>(
//             <li key={index}>{todos}</li>
//         ))}
//     </ul>
// </div>
// )
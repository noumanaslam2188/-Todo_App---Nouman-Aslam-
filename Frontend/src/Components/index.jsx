import React, { useState, useEffect, useContext } from 'react'
// import { useForm } from "react-hook-form"
import { InputChild } from './InputChild'
import { ListmapChild } from './ListmapChild'
import uuid from 'react-uuid'
import { CommentsInput } from './CommentsInput'
import { useContextMode } from './MyContext'
import axios from "axios";
import { posttList, getList, deletetList, puttList, posttComment, getComment, commentDelete, puttComment } from './Axios/auth'



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
    const [input, setInput] = useState('')
    const [todo, setTodo] = useState([])
    // const [register,handleSubmit]=useForm()
    const [commentsinput, setCommentinput] = useState('')
    const [comment, setComment] = useState([])
    const [key, setKey] = useState(0)
    const [show, setShow] = useState(true)
    const [showcomment, setShowcomment] = useState(false)
    const [todoid, setTodoid] = useState(0)
    const [showcupdate, setshowCpdate] = useState(false)
    const [ckey, setCkey] = useState(0)
    const [startdate, setStartdate] = useState()
    const [enddate, setEnddate] = useState()
    const [bkey, setBkey] = useState()
    const [eckey, setEckey] = useState()

    const id = uuid()


    // console.log(commentsinput)
    console.log(todo)
    console.log(comment)

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
        posttList(input)

        const updated = [...todo]
        const myid = {
            input: input
        }
        setTodo([...updated, myid])
        setInput('')

    }

    const addInputToComment = () => {
        // posttComment(commentsinput)
        const updated = [...comment]
        const commentid = {
            input: commentsinput
        }
        setComment([...updated, commentid])
        setCommentinput('')
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        getList()
            .then((task) => {
                setTodo(task || [])

            })
            .catch((error) => {
                console.log('Unable to fetch API data or store it in state', error);
            });
    }


    useEffect(() => {
        getCdata();
    }, [])

    const getCdata = () => {
        getComment()
            .then((task) => {
                setComment(task || [])
            })
            .catch((error) => {
                console.log('Unable to fetch API data or store it in state', error);
            });
    }


    // useEffect(()=>{
    //     axios.get("http://localhost:3000/api/todo/view")
    // .then(resp=>{
    //     console.log (setTodo(resp))
    // })
    // .catch(error=>{
    //     console.log(error)
    // })
    // })



    const deleteit = (_id) => {
        deletetList(_id)
        let updated = [...todo]
        let deleteitem = updated.findIndex((element) => element._id === _id)
        const deletedvalue = updated.splice(deleteitem, 1)
        setTodo([...updated])

    }




    const edit = (_id) => {
        setBkey(_id)
        setShow(false)
        const updated = [...todo]
        const editelement = updated.findIndex((element) => element._id === _id)
        setKey(editelement)
        setInput(updated[editelement].name)

    }

    const saveUpdate = () => {
        puttList(bkey, input)
        setShow(true)
        const updated = [...todo]
        updated[key].name = input
        setTodo([...updated])
        setInput('')
    }

    const openComment = (_id) => {
        setTodoid(_id)
        setShowcomment(true)
    }







    const addcomment = () => {

        console.log(todoid)
        console.log('start date : ' + startdate)
        posttComment(commentsinput, startdate, enddate, todoid)
        const commentobj = {
            name: commentsinput,
            create_date: startdate,
            update_date: enddate,
            todo_id: todoid,
            status: true

        }

        setComment([...comment, commentobj])
        //  setComment('')
        //         const todoindex = todo.findIndex((element) => element._id === todoid)
        //         const existingComment = todo[todoindex].comment
        //         let status = 'upcomming'

        //         let currentDate = Date.now()

        //         const sDateInMilliSeconds = Date.parse(startdate);
        //         const eDateInMilliSeconds = Date.parse(enddate);

        //         if (eDateInMilliSeconds > currentDate) {
        //             status = 'Upcomming'
        //         } else if (eDateInMilliSeconds < currentDate) {
        //             status = 'Due'
        //         }
        //         const updatedcomment = [...existingComment,
        //         { text: commentsinput, sdate: startdate, edate: enddate, cstatus: status }]
        //         console.log(updatedcomment)
        setCommentinput('')

        // const updatedtodo = todo.reduce((acc, item) => {
        //     if (item.id === todoid) {
        //         acc.push({ ...item, comment: updatedcomment })
        //     } else {
        //         acc.push(item)
        //     }
        //     return acc;
        // }, [])
        // setStartdate('')
        setStartdate('')
        setEnddate('')
        // setTodo(updatedcomment)


    }
    //comment functions



    const deleteComment = (_id) => {
        commentDelete(_id)
        const updatedComment = [...comment];
        const commentIndex = updatedComment.findIndex((element) => element._id === _id);

        updatedComment.splice(commentIndex, 1)
        setComment([...updatedComment])
        // const commentIndex = updatedTodo[todoIndex].comment.findIndex(
        //     (element) => element.cid === cid
        // );

        // updatedTodo[todoIndex].comment.splice(commentIndex, 1);
        // setTodo(updatedTodo);

    };


    const editComment = (_id) => {
        setEckey(_id)
        const updatedComment = [...comment];
        const commentIndex = updatedComment.findIndex((element) => element._id === _id);



        // const commentIndex = updatedTodo[todoIndex].comment.findIndex(
        //     (element) => element.cid === cid
        // );

        setCkey(commentIndex)

        const existingText = comment[commentIndex].name;

        const startingDate = comment[commentIndex].create_date;

        const endingDate = comment[commentIndex].update_date;

        setCommentinput(existingText)
        setStartdate(startingDate)
        setEnddate(endingDate)
        // setStartdate(existingDate.split('T')[0]);
        // setStartdate(existingDate.toISOString().split('T')[0]);



        setshowCpdate(true);

    };

    const commentsaveUpdate = () => {
        puttComment(eckey, commentsinput, startdate, enddate, todoid)
        const updated = [...comment];
        // const commentIndex = updated.findIndex((element) => element.ckey === ckey)
        updated[ckey].name = commentsinput;
        updated[ckey].create_date = startdate;
        updated[ckey].update_date = enddate;

        setComment(updated);
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

            <InputChild
                value={input}
                getValue={getValue}
                addinputtoList={addinputtoList}
                show={show}
                saveUpdate={saveUpdate}
                
                >
            </InputChild>


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
                addInputToComment={addInputToComment}

            ></CommentsInput>

            <ListmapChild
                todoid={todoid}
                todo={todo}
                comment={comment}
                deleteit={deleteit}
                edit={edit}
                openComment={openComment}
                cdelete={deleteComment}
                cedit={editComment}
                getendDate={getendDate}

            >

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
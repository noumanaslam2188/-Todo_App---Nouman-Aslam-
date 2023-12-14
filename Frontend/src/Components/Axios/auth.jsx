import axios from "axios";
import { CommentsInput } from "../CommentsInput";


// Main Todo

export const getList=()=>{
   return axios.get("http://localhost:3000/api/todo/view")
    .then(res=>res.data.todo)
    .catch(error=>{
        console.log(error)
    })
};




export const posttList=(getpost)=>{
    const post={
        name:getpost
    }
    axios.post("http://localhost:3000/api/todo/create",post)
    .then(resp=>{
        console.log(resp)
    })
    .catch(error=>{
        console.log(error)
    })
}


export const puttList=(_id,value)=>{

    
    axios.put(`http://localhost:3000/api/todo/update/${_id}`,{name:value})
    .then(resp=>{
        console.log(resp)
    })
    .catch(error=>{
        console.log(error)
    })
}


export const deletetList=(_id)=>{
    

    axios.delete(`http://localhost:3000/api/todo/delete/${_id}`)
    .then(resp=>{
        console.log(resp)
    })
    .catch(error=>{
        console.log(error)
    })
}



// List



export const getComment=()=>{
    return axios.get("http://localhost:3000/api/list/view")
     .then (res=>res.data.data)
     .catch(error=>{
         console.log(error)
     })
 };
 
 
 export const posttComment=(value,startdate,enddate,_id)=>{
     const data={
         name:value,
         create_date:startdate,
         update_date:enddate,
         todo_id:_id,
         status:true
     }
     console.log(data);
     
     axios.post("http://localhost:3000/api/list/create",data,
        {  
            headers: {
                'content-type': 'application/json'
            }
        }
     )
     .then(resp=>{
         console.log(resp+"not foundkjjbjhbjb")
     })
     .catch(error=>{
         console.log(error)
     })
 }
 
 
 export const puttComment=(eckey,commentsinput,startdate,enddate,todoid)=>{
    const commentdata={
        name:commentsinput,
        create_date:startdate,
        update_date:enddate,
        todo_id:todoid,
        status:true
    }
     
     axios.put(`http://localhost:3000/api/list/update/${eckey}`,commentdata)
     .then(resp=>{
         console.log(resp+"Update Responseeeeeeee")
     })
     .catch(error=>{
         console.log(error)
     })
 }
 
 
 export const commentDelete=(_id)=>{
     
 
     axios.delete(`http://localhost:3000/api/list/delete/${_id}`)
     .then(resp=>{
         console.log(resp)
     })
     .catch(error=>{
         console.log(error)
     })
 }
 
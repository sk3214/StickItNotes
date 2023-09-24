import { Note } from "../models/note";

async function fetchData(input:RequestInfo,init:RequestInit){
    const response  = await fetch(input,init);
    if(response.ok){
        // console.log('response',response);
        return response;
    }else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error();
        console.log('Are we comming in error?');
        throw Error(errorMessage);
    }
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetch('api/notes/',{method:"GET"});
    // console.log('response');
    // console.log(typeof(response));
    // console.log(response);
    return response.json();
}

export interface noteInput {
    title:string,
    text?:string,
}

export async function createNote(note:noteInput): Promise<Note>{
    const response = await fetchData('/api/notes',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(note),
    });
    return response.json();
}

export async function updateNote(noteId:String,note:noteInput): Promise<Note>{
    const response = await fetchData('/api/notes/'+noteId,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(note),
    });
    return response.json();
}

export async function deleteNote(noteId:String){
    await fetchData('/api/notes/'+noteId,{method:"DELETE"});
}
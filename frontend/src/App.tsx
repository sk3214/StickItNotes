import React, { useState, useEffect } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import * as notesApi from "./api/notes_api";
import AddEditNoteDialog from './components/AddEditNoteDialog';
import styleUtils from './styles/util.module.css';
import {FaPlus} from 'react-icons/fa'

function App() {
  const [notes,setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog,setShowAddNoteDialog] = useState(false);
  const [noteToEdit,setNoteToEdit] = useState<NoteModel|null>(null);
  useEffect(()=>{
    async function loadData(){
      try{
        const notes = await notesApi.fetchNotes();
        setNotes(notes);  
      }catch(error){
        console.error(error);
        alert(error);
      }
    } 
    loadData();
  },[]);
  async function removeNote(note:NoteModel){
    try{
      setNotes(notes.filter(notesNotToBeDeleted=>notesNotToBeDeleted._id!==note._id));
      await notesApi.deleteNote(note._id);
    }catch(error){
      console.error(error);
      alert(error);
    }
  }
  return (
      <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} 
        onClick={()=>setShowAddNoteDialog(true)}>
        <FaPlus />
        Add New Note
        </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
      {notes.map(note=>(
        <Col key={note._id} className='g-4'>
          <Note 
          note={note} 
          className={styles.note}
          onNoteClicked={setNoteToEdit} 
          onDeleteNoteClicked={removeNote}/>
        </Col>
      ))}
      </Row>
      { showAddNoteDialog && 
        <AddEditNoteDialog onDismiss={()=>setShowAddNoteDialog(false)}  onNoteSaved={(newNote)=>{
          setNotes([...notes,newNote]);
          setShowAddNoteDialog(false);
        }}/>
      }
      
      { noteToEdit && 
        <AddEditNoteDialog onDismiss={()=>setNoteToEdit(null)}  onNoteSaved={(updatedNote)=>{
          setNotes(notes.map(existingNote=> existingNote._id===updatedNote._id ? updatedNote : existingNote));
          setNoteToEdit(null);
        }}/>
      }
      </Container>
  );
}

export default App;

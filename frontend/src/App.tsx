import React, { useState, useEffect } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import * as notesApi from "./api/notes_api";
import AddNoteDialog from './components/AddNoteDialog';
import styleUtils from './styles/util.module.css';

function App() {
  const [notes,setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog,setShowAddNoteDialog] = useState(false);
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
  return (
      <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter}`} 
        onClick={()=>setShowAddNoteDialog(true)}>
        Add New Note
        </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
      {notes.map(note=>(
        <Col key={note._id} className='g-4'>
          <Note note={note} className={styles.note}/>
        </Col>
      ))}
      </Row>
      { showAddNoteDialog && 
        <AddNoteDialog onDismiss={()=>setShowAddNoteDialog(false)} onNoteSaved={(newNote)=>{
          setNotes([...notes,newNote]);
          setShowAddNoteDialog(false);
        }}/>
      }
      </Container>
  );
}

export default App;

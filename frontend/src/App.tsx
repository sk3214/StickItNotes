import React, { useState, useEffect } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import * as notesApi from "./api/notes_api";

function App() {
  const [notes,setNotes] = useState<NoteModel[]>([]);
  useEffect(()=>{
    async function loadData(){
      try{
        const notes = await notesApi.fetchNotes();
        // console.log('Response',response);
        // console.log(noteResponse);
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
      <Row xs={1} md={2} xl={3} className='g-4'>
      {notes.map(note=>(
        <Col key={note._id} className='g-4'>
          <Note note={note} className={styles.note}/>
        </Col>
      ))}
      </Row>
      </Container>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import * as notesApi from "./api/notes_api";
import AddEditNoteDialog from './components/AddEditNoteDialog';
import styleUtils from './styles/util.module.css';
import {FaPlus} from 'react-icons/fa'

function App() {
  const [notes,setNotes] = useState<NoteModel[]>([]);
  const [notesLoading,setNotesLoading] = useState(true);
  const [showNotesLoadingError,setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog,setShowAddNoteDialog] = useState(false);
  const [noteToEdit,setNoteToEdit] = useState<NoteModel|null>(null);


  useEffect(()=>{
    const loadData = async()=>{
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await notesApi.fetchNotes();
        return notes;
    } 
    loadData().then((notes)=>{
      console.log('try');
      setNotes(notes);
    }).catch((error)=>{
      console.log('catch');
      console.error(error);
      setShowNotesLoadingError(true);
    }).finally(()=>{
      console.log('finally');
      setNotesLoading(false);
    });
  },[]);

  const notesGrid = <Row xs={1} md={2} xl={3} className='g-4'>
    {notes.map(note=>(
    <Col key={note._id} className='g-4'>
      <Note 
      note={note} 
      className={styles.note}
      onNoteClicked={()=>setNoteToEdit(note)} 
      onDeleteNoteClicked={removeNote}/>
    </Col>
  ))}
  </Row>

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
      {notesLoading && <Spinner animation='border' variant='primary'/>}
      {showNotesLoadingError && <p>Something Went Wrong here.</p>}
      {!notesLoading && !showNotesLoadingError && 
        <>
        {
          notes.length>0?
          notesGrid
          :
          <p>You don't have any notes yet!</p>
        }
        </>
      }
      { showAddNoteDialog && 
        <AddEditNoteDialog onDismiss={()=>setShowAddNoteDialog(false)}  onNoteSaved={(newNote)=>{
          setNotes([...notes,newNote]);
          setShowAddNoteDialog(false);
        }}/>
      }
      
      { noteToEdit && 
        <AddEditNoteDialog 					
        noteToEdit={noteToEdit}
        onDismiss={()=>setNoteToEdit(null)}  
        onNoteSaved={(updatedNote)=>{
          console.log(updatedNote);
          setNotes(notes.map((existingNote)=>{
            if(existingNote._id!==updatedNote._id){
              return existingNote;
            }
            return updatedNote;
          }));
          console.log(notes);
          setNoteToEdit(null);
        }}/>
      }
      </Container>
  );
}

export default App;

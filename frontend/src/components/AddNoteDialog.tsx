import { Button, Form, Modal } from "react-bootstrap";
import { noteInput } from "../api/notes_api";
import { useForm } from "react-hook-form";
import * as notesApi from "../api/notes_api"
import { Note } from "../models/note";

interface AddNoteDialogProps {
    onDismiss: ()=>void,
    onNoteSaved: (note:Note) => void,
}

const AddNoteDialog = ({onDismiss,onNoteSaved}:AddNoteDialogProps) => {

    const { register, handleSubmit, formState:{errors, isSubmitting} } = useForm<noteInput>(); 

    async function onSubmit(input:noteInput){
        try{
            const notesResponse = await notesApi.createNote(input);
            onNoteSaved(notesResponse);
        }catch(error){
            console.log(error);
            alert(error);
        }
    }

  return (
    <Modal show onHide={()=>onDismiss()}>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Note
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" >
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Title" 
                    isInvalid={!!errors.title}
                    {...register("title",{ required: "Required" })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Text"
                    {...register("text")}
                    />
                </Form.Group>
                
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
                Save
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default AddNoteDialog
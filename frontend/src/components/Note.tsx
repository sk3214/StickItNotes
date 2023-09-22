import styles from '../styles/Note.module.css';
import styleUtils from '../styles/util.module.css'
import {Note as NoteModel} from '../models/note';
import {Card} from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';
import {MdDelete} from 'react-icons/md';

interface noteProps{
    note:NoteModel,
    onNoteClicked:(note:NoteModel)=>void,
    onDeleteNoteClicked: (note:NoteModel)=>void,
    className?:string,
}

const Note = ({note,onNoteClicked,onDeleteNoteClicked,className}:noteProps) => {
    const {title,text,createdAt,updatedAt} = note;
    let createdUpdatedDate:string;
    if(updatedAt>createdAt){
        createdUpdatedDate = "Updated: "+ formatDate(updatedAt);
    }else{
        createdUpdatedDate = "Created: "+ formatDate(createdAt);
    }
  return (
    <Card className={`${styles.noteCard} ${className}`}
     onClick={()=>onNoteClicked(note)}
    >
        <Card.Body className={styles.cardBody}>
            <Card.Title className={styleUtils.flexCenter}>
                {title}
                <MdDelete className='text-muted ms-auto' 
                onClick={(e)=>{
                    onDeleteNoteClicked(note);
                    e.stopPropagation();
                }}
                />
            </Card.Title>
            <Card.Text>
                {text}
            </Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted'>
            {createdUpdatedDate}
        </Card.Footer>
    </Card>
  )
}

export default Note
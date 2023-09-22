import styles from '../styles/Note.module.css';
import {Note as NoteModel} from '../models/note';
import {Card} from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';

interface noteProps{
    note:NoteModel,
    className?:string,
}

const Note = ({note,className}:noteProps) => {
    const {title,text,createdAt,updatedAt} = note;
    let createdUpdatedDate:string;
    if(updatedAt>createdAt){
        createdUpdatedDate = "Updated: "+ formatDate(updatedAt);
    }else{
        createdUpdatedDate = "Created: "+ formatDate(createdAt);
    }
  return (
    <Card className={`${styles.noteCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
            <Card.Title>
                {title}
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
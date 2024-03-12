import React from 'react'
import { useNote } from '../Pages/NoteLayout'
import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from "react-markdown"
// import { Note } from '../App';

type NoteProps = {
    onDelete: (id: string) => void
}
const Note = ({ onDelete }: NoteProps) => {
    const navigate = useNavigate();
    const note = useNote();

    const handleDelete = (id: string) => {
        if (window.confirm("Are  you sure to delete this note?")) {
            onDelete(id);
            navigate('/');
        }
    }

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack
                            gap={1}
                            direction='horizontal'
                            className='flex-wrap'
                        >
                            {note.tags.map(tag => (
                                <Badge className='text-truncate' key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction='horizontal'>
                        <Link to={`/${note.id}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button variant='outline-danger' onClick={() => handleDelete(note.id)}>Delete</Button>
                        <Link to={'..'}>
                            <Button variant="outline-secondary">Back</Button></Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>
                {note.markdown}
            </ReactMarkdown>
        </>
    )
}

export default Note

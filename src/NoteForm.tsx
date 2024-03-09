import React, { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from './App';


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}

const NoteForm = ({ onSubmit }: NoteFormProps) => {
    const navigate = useNavigate();
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const previousPage = () => {
        navigate('..');
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit({
            // Type narrowing of string | undefined type to string by two methods 
            title: titleRef.current?.value as string,
            markdown: markdownRef.current?.value ?? "",
            tags: [].
        })
    }
    return (
        <Form onSubmit={handleSubmit} >
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(
                                        tags.map(tag => {
                                            return { label: tag.label, id: tag.value }
                                        })
                                    )
                                }}

                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdowm'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={markdownRef} required as="textarea" rows={15} />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type='submit' variant='outline-primary' >Save</Button>
                    <Link to="..">
                        <Button type='button' variant='outline-secondary' >Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}

export default NoteForm

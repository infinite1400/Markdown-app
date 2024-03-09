import React from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CreatableReactSelect from "react-select/creatable";
const NoteForm = () => {
    const navigate = useNavigate();
    const previousPage = () => {
        navigate('..');
    }
    return (
        <Form>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdowm'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as="textarea" rows={15} />
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

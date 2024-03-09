import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
// components 
import NewNote from "./NewNote";

// Types 
export type Note = {
  id : string
} & NoteData

export type RowNote={
  id : string
}

export type RowNoteData={
  title : string,
  markdown : string
  tagIds : string[]
}

export type NoteData={
  title : string,
  markdown : string
  tags : Tag[]
}

export type Tag={
  id : string
  label : string
}


const App = () => {
  const [notes,setNotes]useLocalStorage<RawNote[]>("NOTES",[]);
  const [tags,setTags]useLocalStorage<Tag[]>("TAGS",[]);
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote/>} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App

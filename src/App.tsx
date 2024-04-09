import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { useMemo } from "react";
// Pages 
import NewNote from "./Pages/NewNote";
import NoteLayout from "./Pages/NoteLayout";
import EditNote from "./Pages/EditNote";
import NoteList from "./Pages/NoteList";
// Components 
import useLocalStorage from "./Components/useLocalStorage";
import Note from "./Components/Note";

// Types 
export type NoteData = {
  title: string,
  markdown: string
  tags: Tag[]
}
export type Note = {
  id: string
} & NoteData

export type RawNoteData = {
  title: string,
  markdown: string
  tagIds: string[]
}

export type RawNote = {
  id: string
} & RawNoteData


export type Tag = {
  id: string
  label: string
}

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }];
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag;
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }


  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note;
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList
          notes={noteWithTags}
          availableTags={tags}
          onUpdateTag={updateTag}
          onDeleteTag={deleteTag}
        />} />
        <Route path="/new" element={<NewNote
          onSubmit={onCreateNote}
          onAddTag={addTag}
          availableTags={tags}
        />} />
        <Route path="/:id" element={<NoteLayout notes={noteWithTags} />} >
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote}
            onAddTag={addTag}
            availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App

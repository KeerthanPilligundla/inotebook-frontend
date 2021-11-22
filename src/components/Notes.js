import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/notesContext'
import Notesitem from './Notesitem';
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import Spinner from './Spinner'
const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getallNotes, editNotes } = context;
    const navigate = useNavigate();
    const ref = useRef(null)
    const refClose = useRef(null)
    const { showAlert } = props
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(localStorage.getItem('token')){
            getallNotes()
            setLoading(false)
        }else{
            navigate("/login")
        }

        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        console.log("updating Note", note)
        e.preventDefault();
        editNotes(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        showAlert("Updated Sucessfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} rows="4" onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <nav className="navbar navbar-light my-3" style={{ backgroundColor: "GhostWhite" }}>
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Your Notes</span>
                        <ul className="navbar-nav mb-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="btn btn-outline-primary" role="button" aria-disabled="true" to="/addNotes">Add New Notes</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {loading && <Spinner/>}
                <div className="row my-3">
                    <div>
                        {notes.length === 0 && 'No notes to display. please add notes'}
                    </div>
                        {notes.map((note) => {
                        return <Notesitem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />;
                        })}
                </div>
                
            </div>
        </>
    )
}

export default Notes

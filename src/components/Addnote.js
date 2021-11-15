import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/notesContext'
import {useNavigate} from 'react-router-dom'
const Addnote = (props) => {
    const context = useContext(noteContext);
    const{addNotes}=context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    let navigate = useNavigate();
    const handleClick = (e) =>{
        e.preventDefault();
        addNotes(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success")
        navigate("/")
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="conatiner">
            <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={note.description} rows="4" onChange={onChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="d-grid gap-2">
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary"  onClick={handleClick}>Add Notes</button>
                    </div>
                </form>
        </div>
    )
}

export default Addnote

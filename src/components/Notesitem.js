import React,{useContext} from 'react'
import noteContext from '../context/notes/notesContext'
import { Link } from "react-router-dom";
const Notesitem = (props) => {
    const context = useContext(noteContext);
    const{deleteNotes,setViewnotes}=context;
    var {note,updateNote,showAlert}=props
    const handleDelete = ()=>{
        deleteNotes(note._id);
        showAlert("Deleted Successfully","success")
    }
    const handleEdit =()=>{
        updateNote(note);
    }
    const handleView = () =>{
        setViewnotes(note)
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title.slice(0,10)}...</h5>
                    <p className="card-text">{note.description.slice(0,50)}...</p>
                    <div className="d-flex justify-content-around">
                    <i className="fas fa-trash mx-2" style={{color:"#002966"}} onClick={handleDelete}></i>
                    <i className="fas fa-edit mx-2 " style={{color:"#002966"}} onClick={handleEdit}></i>
                    <Link to="/view"><i className="fas fa-eye mx-2" style={{color:"#002966"}} onClick={handleView}></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notesitem

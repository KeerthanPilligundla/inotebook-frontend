import React, { useContext } from 'react'
import noteContext from '../context/notes/notesContext'
const View = () => {
    const context = useContext(noteContext);
    const { viewnotes } = context;
    return (
        <>
        <div className="container my-4">
            <div className="mb-3 row">
                <label htmlFor="vTitle" className="col-sm-2 col-form-label">Title</label>
                <div className="col-sm-10">
                    <input class="form-control" type="text" value={viewnotes.title} disabled readonly></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="vTag" className="col-sm-2 col-form-label">Tag</label>
                <div className="col-sm-10">
                    <input class="form-control" type="text" value={viewnotes.tag} disabled readonly></input>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="vDescription" className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                    <textarea className="form-control" rows="5" value={viewnotes.description} disabled readonly></textarea>
                </div>
            </div>
        </div>
        </>
    )
}

export default View

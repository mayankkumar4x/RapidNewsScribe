import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const { note, updateNote, mode } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const cardClass = `card col-md-5 m-3 shadow ${
    mode === 'dark' ? 'bg-secondary text-light border border-light' : 'bg-light text-dark'
  }`;

  const headerClass = `d-flex align-items-center justify-content-between p-2 ${
    mode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'
  }`;

  return (
    <div className={cardClass}>
      <div className="card-body p-0">
        <div className={headerClass}>
          <h5 className="card-title mb-0">{note.title}</h5>
          <span>
            <i
              className="fa-solid fa-pen-to-square text-success mx-3"
              onClick={() => updateNote(note)}
              role="button"
            ></i>
            <i
              className="fa-solid fa-trash text-danger"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted successfully", "success");
              }}
              role="button"
            ></i>
          </span>
        </div>

        <p className="card-text p-2">{note.description}</p>
        <div className="p-2">
          <a
            className={`btn btn-sm ${mode === 'dark' ? 'btn-outline-light' : 'btn-primary'}`}
            href={note.newsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            News Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

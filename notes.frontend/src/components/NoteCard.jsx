import { Edit2, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
function NoteCard({ note, onEdit, onDelete, t }) {

    const handleDelete = () => {
        Swal.fire({
            title: t('confirmDeleteTitle'),
            text: t('confirmDelete'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: t('confirm'),
            cancelButtonText: t('cancel')
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(note.id);
                Swal.fire({
                    title: t('deleted'),
                    text: t('noteDeleted'),
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }

    return (
        <div className="note-card">
            <div className="note-header">
                <h3>{note.title}</h3>
                <div className="note-actions">
                    <button onClick={() => onEdit(note)} className="btn btn-icon" title={t.edit}>
                        <Edit2 size={16} />
                    </button>
                    <button onClick={handleDelete} className="btn btn-icon btn-danger" title={t.delete}>
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            {note.content && (
                <div className="note-content">
                    <p>{note.content}</p>
                </div>
            )}
            <div className="note-meta">
                <small>ID: {note.id}</small>
            </div>
        </div>
    );
};

export default NoteCard;
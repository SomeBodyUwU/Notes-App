import { useReducer, useEffect, useState } from 'react';
import { Plus, Languages } from 'lucide-react';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import { notesReducer, initialState } from './reducer/notesReducer';
import apiService from './services/apiService';
import { useTranslation } from 'react-i18next';

function App() {

    const [state, dispatch] = useReducer(notesReducer, initialState);
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language || 'en');

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {

        dispatch({ type: 'SET_LOADING', payload: true });

        try
        {
            const notes = await apiService.getAllNotes();
            dispatch({ type: 'SET_NOTES', payload: notes });
        }
        catch (error)
        {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const handleCreateNote = async (noteData) => {

        dispatch({ type: 'SET_LOADING', payload: true });

        try
        {
            const newNote = await apiService.createNote(noteData);
            dispatch({ type: 'ADD_NOTE', payload: newNote });
        }
        catch (error)
        {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const handleUpdateNote = async (noteData) => {

        dispatch({ type: 'SET_LOADING', payload: true });

        try
        {
            const updatedNote = await apiService.updateNote(state.editingNote.id, noteData);
            dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
        }
        catch (error)
        {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const handleDeleteNote = async (id) => {

        dispatch({ type: 'SET_LOADING', payload: true });

        try
        {
            await apiService.deleteNote(id);
            dispatch({ type: 'DELETE_NOTE', payload: id });
        }
        catch (error)
        {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    const handleSaveNote = (noteData) => {

        if (state.editingNote)
        {
            handleUpdateNote(noteData);
        }
        else
        {
            handleCreateNote(noteData);
        }
    };

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'uk' : 'en';
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="app">
            <div className="header">
                <h1>{t('title')}</h1>
                <div className="header-actions">
                    <button
                        onClick={() => dispatch({ type: 'SET_SHOW_FORM', payload: true })}
                        className="btn btn-primary"
                    >
                        <Plus size={16} />
                        {t('addNote')}
                    </button>
                    <button onClick={toggleLanguage} className="btn btn-lang">
                        <Languages size={16} />
                        {language === 'en' ? 'Українська' : 'English'}
                    </button>
                </div>
            </div>

            {state.loading && <div className="loading">{t('loading')}</div>}
            {state.error && <div className="error">{t('error')}: {state.error}</div>}

            {!state.loading && state.notes.length === 0 && !state.error && (
                <div className="empty-state">
                    <h3>{t('noNotes')}</h3>
                    <p>{t('noNotesClick')}</p>
                </div>
            )}

            {state.notes.length > 0 && (
                <div className="notes-grid">
                    {state.notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onEdit={(note) => dispatch({ type: 'SET_EDITING_NOTE', payload: note })}
                            onDelete={handleDeleteNote}
                            t={t}
                        />
                    ))}
                </div>
            )}

            {state.showForm && (
                <div className="note-form-overlay">
                    <NoteForm
                        note={state.editingNote}
                        onSave={handleSaveNote}
                        onCancel={() => dispatch({ type: 'CANCEL_EDIT' })}
                        t={t}
                    />
                </div>
            )}
        </div>
    );
}

export default App;

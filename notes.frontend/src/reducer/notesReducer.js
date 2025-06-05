export const initialState = {
    notes: [],
    loading: false,
    error: null,
    editingNote: null,
    showForm: false
};

export function notesReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.payload,
                loading: false,
                error: null
            };
        case 'ADD_NOTE':
            return {
                ...state,
                notes: [...state.notes, action.payload],
                showForm: false,
                loading: false
            };
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.id ? action.payload : note
                ),
                editingNote: null,
                showForm: false,
                loading: false
            };
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload),
                loading: false
            };
        case 'SET_EDITING_NOTE':
            return {
                ...state,
                editingNote: action.payload,
                showForm: true
            };
        case 'SET_SHOW_FORM':
            return {
                ...state,
                showForm: action.payload,
                editingNote: null
            };
        case 'CANCEL_EDIT':
            return {
                ...state,
                editingNote: null,
                showForm: false
            };
        default:
            return state;
    }
}
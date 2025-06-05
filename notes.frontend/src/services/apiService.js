const API_BASE_URL = 'https://localhost:7146/api';

const apiService = {
    async getAllNotes() {
        const response = await fetch(`${API_BASE_URL}/Notes`);
        if (!response.ok) throw new Error('Failed to fetch notes');
        return response.json();
    },

    async createNote(noteData) {
        const response = await fetch(`${API_BASE_URL}/Notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData),
        });
        if (!response.ok) throw new Error('Failed to create note');
        return response.json();
    },

    async updateNote(id, noteData) {
        const response = await fetch(`${API_BASE_URL}/Notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData),
        });
        if (!response.ok) throw new Error('Failed to update note');
        return response.json();
    },

    async deleteNote(id) {
        const response = await fetch(`${API_BASE_URL}/Notes/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete note');
        return true;
    }
};

export default apiService;
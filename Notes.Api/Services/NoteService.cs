using Notes.Api.Abstractions;
using Notes.Api.Models;
using System.Collections.Concurrent;

namespace Notes.Api.Services
{
    public class NoteService : INoteService
    {
        private readonly ConcurrentDictionary<Guid, Note> _notes = new();

        public NoteService()
        {
            Note note1 = new Note
            {
                Title = "Welcome Note",
                Content = "This is your first note. You can edit or delete it.",
                CreatedAt = DateTime.UtcNow.AddHours(-1),
                UpdatedAt = DateTime.UtcNow.AddHours(-1)
            };

            Note note2 =  new Note
            {
                Title = "Sample Note",
                Content = "This is another sample note to demonstrate the application.",
                CreatedAt = DateTime.UtcNow.AddMinutes(-30),
                UpdatedAt = DateTime.UtcNow.AddMinutes(-30)
            };

            _notes.TryAdd(note1.Id, note1);
            _notes.TryAdd(note2.Id, note2);
        }

        public Task<IEnumerable<Note>> GetAllNotesAsync()
        {
            var notes = _notes.Values.
                OrderBy(n => n.CreatedAt)
                .AsEnumerable();
            return Task.FromResult(notes);
        }

        public Task<Note?> GetNoteByIdAsync(Guid id)
        {
            _notes.TryGetValue(id, out var note);
            return Task.FromResult(note);
        }

        public Task<Note> CreateNoteAsync(CreateNoteRequest request)
        {
            var note = new Note
            {
                Title = request.Title,
                Content = request.Content,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _notes.TryAdd(note.Id, note);

            return Task.FromResult(note);
        }

        public Task<Note?> UpdateNoteByIdAsync(Guid id, UpdateNoteRequest request)
        {
            if (_notes.TryGetValue(id, out var existingNote))
            {
                existingNote.Title = request.Title;
                existingNote.Content = request.Content;
                existingNote.UpdatedAt = DateTime.UtcNow;

                return Task.FromResult<Note?>(existingNote);
            }

            return Task.FromResult<Note?>(null);
        }

        public Task<bool> DeleteNoteByIdAsync(Guid id)
        {
            var removed = _notes.TryRemove(id, out _);
            return Task.FromResult(removed);
        }
    }
}

using Notes.Api.Models;

namespace Notes.Api.Abstractions
{
    public interface INoteService
    {
        Task<IEnumerable<Note>> GetAllNotesAsync();
        Task<Note?> GetNoteByIdAsync(Guid id);
        Task<Note> CreateNoteAsync(CreateNoteRequest request);
        Task<Note?> UpdateNoteByIdAsync(Guid id, UpdateNoteRequest request);
        Task<bool> DeleteNoteByIdAsync(Guid id);
    }
}

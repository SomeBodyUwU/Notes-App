using Microsoft.AspNetCore.Mvc;
using Notes.Api.Abstractions;
using Notes.Api.Models;

namespace Notes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;

        public NotesController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetAllNotesAsync()
        {
            var notes = await _noteService.GetAllNotesAsync();
            return Ok(notes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNoteById(Guid id)
        {
            var note = await _noteService.GetNoteByIdAsync(id);

            if (note == null)
            {
                return NotFound(new { message = $"Note with ID {id} not found." });
            }

            return Ok(note);
        }

        [HttpPost]
        public async Task<ActionResult<Note>> CreateNote([FromBody] CreateNoteRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                return BadRequest(new { message = "Title is required." });
            }

            var note = await _noteService.CreateNoteAsync(request);
            return CreatedAtAction(nameof(GetNoteById), new { id = note.Id }, note);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Note>> UpdateNoteById(Guid id, [FromBody] UpdateNoteRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Title))
            {
                return BadRequest(new { message = "Title is required." });
            }

            var updatedNote = await _noteService.UpdateNoteByIdAsync(id, request);

            if (updatedNote == null)
            {
                return NotFound(new { message = $"Note with ID {id} not found." });
            }

            return Ok(updatedNote);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNoteById(Guid id)
        {
            var deleted = await _noteService.DeleteNoteByIdAsync(id);

            if (!deleted)
            {
                return NotFound(new { message = $"Note with ID {id} not found." });
            }

            return NoContent();
        }
    }
}

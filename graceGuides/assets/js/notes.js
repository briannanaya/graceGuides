// Initialize Quill editor
var quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        ['clean']
      ]
    }
  });
  
  // Function to save the note
  function saveNote() {
    const content = quill.getContents();
    let notes = JSON.parse(localStorage.getItem('userNotes')) || [];
    notes.push(content);
    localStorage.setItem('userNotes', JSON.stringify(notes));
    displaySavedNotes(); // Update the displayed notes
  }
  
  // Function to clear the note
  function clearNote() {
    quill.setContents([]);
  }
  
  // Function to download the note as a TXT file
  function downloadTxt() {
    const text = quill.getText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Function to display saved notes
  function displaySavedNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('userNotes')) || [];
    const savedNotesContainer = document.getElementById('saved-notes');
    savedNotesContainer.innerHTML = ''; // Clear existing notes
  
    if (savedNotes.length > 0) {
      savedNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'saved-note';
        noteElement.innerHTML = `
          <h3>Note ${index + 1}</h3>
          <div class="saved-note-content">${note.ops.map(op => op.insert).join('')}</div>
          <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;
        savedNotesContainer.appendChild(noteElement);
      });
    } else {
      savedNotesContainer.innerHTML = '<p>No saved notes.</p>';
    }
  }
  
  // Function to delete a specific note
  function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('userNotes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('userNotes', JSON.stringify(notes));
    displaySavedNotes(); // Update the displayed notes
  }
  
  // Display saved notes when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    displaySavedNotes(); // Display saved notes on page load
  });
  
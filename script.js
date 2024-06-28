  const addBtn = document.getElementById('add');
    const searchInput = document.getElementById('search');
    const notesContainer = document.getElementById('notes-container');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');
    const modalTitle = document.getElementById('modal-title');
    const modalTextarea = document.getElementById('modal-textarea');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let currentNote = null;

    notes.forEach(note => addNewNote(note.title, note.text));

    addBtn.addEventListener('click', () => {
      currentNote = null;
      modalTitle.value = '';
      modalTextarea.value = '';
      openModal();
    });

    searchInput.addEventListener('input', (e) => {
      const searchText = e.target.value.toLowerCase();
      document.querySelectorAll('.note').forEach(note => {
        const title = note.querySelector('.title').textContent.toLowerCase();
        const text = note.querySelector('textarea').value.toLowerCase();
        note.style.display = title.includes(searchText) || text.includes(searchText) ? 'block' : 'none';
      });
    });

    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModalFunc();
      }
    });

    function addNewNote (title = '', text = '') {
      const note = document.createElement('div');
      note.classList.add('note');

      note.innerHTML = `
        <div class="tools">
          <span class="title">${title}</span>
          <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <textarea class="hidden">${text}</textarea>
      `;

      const deleteBtn = note.querySelector('.delete');
      const titleSpan = note.querySelector('.title');
      const textArea = note.querySelector('textarea');

      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        note.remove();
        updateLS();
      });

      note.addEventListener('click', () => {
        currentNote = note;
        modalTitle.value = titleSpan.textContent;
        modalTextarea.value = textArea.value;
        openModal();
      });

      notesContainer.appendChild(note);
      updateLS();
    }

    function openModal() {
      modal.style.display = 'flex';
    }

    function closeModalFunc() {
      if (currentNote) {
        const titleSpan = currentNote.querySelector('.title');
        const textArea = currentNote.querySelector('textarea');
        titleSpan.textContent = modalTitle.value;
        textArea.value = modalTextarea.value;
      } else {
        addNewNote(modalTitle.value, modalTextarea.value);
      }
      updateLS();
      modal.style.display = 'none';
    }

    function updateLS() {
      const notes = Array.from(document.querySelectorAll('.note')).map(note => ({
        title: note.querySelector('.title').textContent,
        text: note.querySelector('textarea').value
      }));
      localStorage.setItem('notes', JSON.stringify(notes));
    }

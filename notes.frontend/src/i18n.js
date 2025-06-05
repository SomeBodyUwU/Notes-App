import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            title: 'Notes Management',
            addNote: 'Add Note',
            editNote: 'Edit Note',
            noteTitle: 'Note Title',
            noteContent: 'Note Content',
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            noNotes: 'No notes found. Create your first note!',
            noNotesClick: 'Click the "Add Note" button to get started.',
            loading: 'Loading...',
            error: 'Error occurred',
            titleRequired: 'Title is required',
            language: 'Language',
            confirmDeleteTitle: 'Delete note?',
            confirmDelete: 'This action cannot be undone',
            confirm: 'Yes, delete',
            deleted: 'Deleted!',
            noteDeleted: 'Note has been deleted.'
        }
    },
    uk: {
        translation: {
            title: 'Управління Нотатками',
            addNote: 'Додати Нотатку',
            editNote: 'Редагувати Нотатку',
            noteTitle: 'Заголовок Нотатки',
            noteContent: 'Зміст Нотатки',
            save: 'Зберегти',
            cancel: 'Скасувати',
            edit: 'Редагувати',
            delete: 'Видалити',
            noNotes: 'Нотатки не знайдено. Створіть свою першу нотатку!',
            noNotesClick: 'Натисніть "Додати Нотатку" кнопку щоб розпочати.',
            loading: 'Завантаження...',
            error: 'Сталася помилка',
            titleRequired: 'Заголовок обов\'язковий',
            language: 'Мова',
            confirmDeleteTitle: 'Видалити нотатку?',
            confirmDelete: 'Цю дію не можна скасувати',
            confirm: 'Так, видалити',
            deleted: 'Видалено!',
            noteDeleted: 'Нотатку видалено.'
        }
    }
};

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18next;

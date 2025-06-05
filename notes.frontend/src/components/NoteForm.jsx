import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Save, X } from 'lucide-react'

function NoteForm({ note, onSave, onCancel }) {

    const [formData, setFormData] = useState({
        title: note?.title || '',
        content: note?.content || ''
    });

    const [errors, setErrors] = useState({});

    const { t } = useTranslation();

    const handleSubmit = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = t('titleRequired');
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onSave(formData);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    return (
        <div className="note-form-overlay">
            <div className="note-form">
                <h3>{note ? t('editNote') : t('addNote')}</h3>
                <div>
                    <div className="form-group">
                        <label htmlFor="title">{t.noteTitle}</label>
                        {errors.title && <span className="error-message">{errors.title}</span>}
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className={errors.title ? 'error' : ''}
                            placeholder={t('noteTitle')}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">{t.noteContent}</label>
                        <textarea
                            id="content"
                            className="note-textarea"
                            value={formData.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                            placeholder={t('noteContent')}
                            rows="4"
                        />
                    </div>

                    <div className="form-actions">
                        <button onClick={handleSubmit} className="btn btn-primary">
                            <Save size={16} />
                            {t('save')}
                        </button>
                        <button onClick={onCancel} className="btn btn-secondary">
                            <X size={16} />
                            {t('cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteForm;
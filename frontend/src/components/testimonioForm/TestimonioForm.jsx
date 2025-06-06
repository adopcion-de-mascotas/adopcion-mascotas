

import React, { useState } from 'react';
import './TestimonioForm.css';

export default function TestimonioForm() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'consejos',
        image: null,
        imagePreview: null
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file && file.type.match('image.*')) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'El título es requerido';
            valid = false;
        }

        if (!formData.content.trim()) {
            newErrors.content = 'El contenido es requerido';
            valid = false;
        } else if (formData.content.trim().length < 150) {
            newErrors.content = 'El contenido debe tener al menos 150 caracteres';
            valid = false;
        }

        if (!formData.image) {
            newErrors.image = 'Por favor selecciona una imagen';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitSuccess(true);

                setTimeout(() => {
                    setFormData({
                        title: '',
                        content: '',
                        category: 'consejos',
                        image: null,
                        imagePreview: null
                    });
                    setSubmitSuccess(false);
                }, 3000);
            }, 2000);
        }
    };

    return (
        <>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-emerald-600 mb-2">
                                <i className="fas fa-paw mr-3"></i>Happy Paw
                            </h1>
                            <h2 className="text-2xl font-semibold text-gray-700">Cargar Nuevo Testimonio</h2>
                            <p className="text-gray-500 mt-2">Comparte información valiosa con nuestra comunidad de amantes de mascotas</p>
                        </div>

                        {submitSuccess && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
                                <div className="flex items-center">
                                    <i className="fas fa-check-circle mr-2"></i>
                                    <span>¡Noticia enviada con éxito! Será publicada tras revisión.</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg overflow-hidden">
                            <div className="p-6 sm:p-8">
                                <div className="mb-6">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Título de la Noticia <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                        placeholder="Ej: 10 Consejos para el cuidado de tu perro en verano"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                        Categoría
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    >
                                        <option value="consejos">Consejos</option>
                                        <option value="salud">Salud</option>
                                        <option value="alimentacion">Alimentación</option>
                                        <option value="entrenamiento">Entrenamiento</option>
                                        <option value="historias">Historias Inspiradoras</option>
                                        <option value="eventos">Eventos</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contenido <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        rows="8"
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                        placeholder="Escribe el contenido detallado de tu noticia..."
                                    ></textarea>
                                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                    <p className="mt-1 text-xs text-gray-500">{formData.content.length}/150 caracteres mínimos</p>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Imagen Destacada <span className="text-red-500">*</span>
                                    </label>
                                    <div
                                        className={`dropzone rounded-lg p-8 text-center cursor-pointer ${errors.image ? 'border-red-500 bg-red-50' : ''}`}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    >
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

                                        {formData.imagePreview ? (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={formData.imagePreview}
                                                    alt="Preview"
                                                    className="max-h-48 max-w-full mb-4 rounded-lg object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            image: null,
                                                            imagePreview: null
                                                        }));
                                                    }}
                                                    className="text-sm text-red-500 hover:text-red-700"
                                                >
                                                    <i className="fas fa-trash mr-1"></i> Cambiar imagen
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <i className="fas fa-cloud-upload-alt text-3xl text-emerald-400"></i>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Arrastra y suelta una imagen aquí <br />o haz clic para seleccionar
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Formatos soportados: JPG, PNG, GIF (Máx. 5MB)
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({
                                                title: '',
                                                content: '',
                                                category: 'consejos',
                                                image: null,
                                                imagePreview: null
                                            });
                                            setErrors({});
                                        }}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'} transition-colors flex items-center`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-paper-plane mr-2"></i> Publicar Noticia
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>Todas las noticias son revisadas por nuestro equipo antes de ser publicadas.</p>
                            <p className="mt-1">Gracias por contribuir a nuestra comunidad de Happy Paw!</p>
                        </div>
                    </div>
                </div>
                </>
    );
}

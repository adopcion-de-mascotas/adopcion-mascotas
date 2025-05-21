import React, { useState } from "react";
import BlogModal from "../../pages/blogs/blog_modal/Blog_Modal";
import { Link } from "react-router-dom";

export default function Blog({ blog }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative overflow-hidden h-48">
          <img
            src={blog.imagen}
            alt={blog.alt}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
            {blog.categoria}
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>
              <i className="far fa-calendar mr-1"></i> {blog.fecha}
            </span>
            <span className="mx-2">•</span>
            <span>
              <i className="far fa-clock mr-1"></i> {blog.lectura}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {blog.titulo}
          </h3>
          <p className="text-gray-600 mb-4">{blog.descripcion}</p>
          <Link
            onClick={() => openModal(blog)}
            className="inline-block px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-600 hover:text-white"
          >
            Ver blog completo
          </Link>
        </div>
      </div>

      {/* Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={closeModal}
        blog={selectedBlog}
      />
    </>
  );
}

// This would be replaced with actual page navigation in a real implementation
document.querySelectorAll('a[href^="#blog"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const blogId = this.getAttribute('href');
        document.querySelector(blogId).classList.remove('hidden');
        document.querySelector(blogId).classList.add('flex');
        document.body.style.overflow = 'hidden';
    });
});

function closeBlog() {
    document.querySelectorAll('[id^="blog"]').forEach(blog => {
        blog.classList.add('hidden');
        blog.classList.remove('flex');
    });
    document.body.style.overflow = 'auto';
}
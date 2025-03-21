// Reply functionality
document.addEventListener('DOMContentLoaded', () => {
    // Event delegation for reply buttons
    document.body.addEventListener('click', (event) => {
        const replyBtn = event.target.closest('.reply-btn');

        if (replyBtn) {
            const form = replyBtn.nextElementSibling;

            // Toggle form visibility
            if (form.style.display === 'block') {
                form.style.maxHeight = null;
                form.style.opacity = 0;
                setTimeout(() => form.style.display = 'none', 300);
            } else {
                form.style.display = 'block';
                setTimeout(() => {
                    form.style.maxHeight = form.scrollHeight + 'px';
                    form.style.opacity = 1;
                }, 10);
            }
        }
    });

    // Hide form on submit
    document.querySelectorAll('.reply-form').forEach(form => {
        form.addEventListener('submit', () => {
            form.style.maxHeight = null;
            form.style.opacity = 0;
            setTimeout(() => form.style.display = 'none', 300);
        });
    });
});
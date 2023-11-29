const titleEl = document.querySelector('#title');
const contentEl = document.querySelector('#content');
const createLink = document.querySelector('#createLink');
const cancelBtn = document.querySelector('#cancelBtn');
const updateBtn = document.querySelector('#updateBtn');
const deleteBtn = document.querySelector('#deleteBtn');

const cancelPostHandler = async event => {
    event.preventDefault();
    document.location.replace('/dashboard');
    };

constUpdatePostHandler = async event => {
    event.preventDefault();
    const title = titleEl.value.trim();
    const content = contentEl.value.trim();
    if (title.length > 0 && content.length > 0) {
        const id = document.location.pathname.split('/').at(-1);
        const response = await fetch(`/dashboard/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Failed to update post');
            }
    }
}
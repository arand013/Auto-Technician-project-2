async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('textarea[name="post-title"]').value;
    const email = document.querySelector('textarea[name="post-email"]').value.trim();
    const phone = document.querySelector('textarea[name="post-phone-number"]').value.trim();
    const car = document.querySelector('textarea[name="post-car"]').value.trim();
    const city = document.querySelector('textarea[name="post-city"]').value.trim();
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            email,
            phone,
            car,
            city,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
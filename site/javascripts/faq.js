document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {

        const item = button.parentElement;
        const answer = item.querySelector('.faq-answer');

        if (item.classList.contains('active')) {

            answer.style.maxHeight = answer.scrollHeight + 'px';

            requestAnimationFrame(() => {
                answer.style.maxHeight = '0px';
            });

            item.classList.remove('active');

        } else {

            item.classList.add('active');

            requestAnimationFrame(() => {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            });
        }
    });
});
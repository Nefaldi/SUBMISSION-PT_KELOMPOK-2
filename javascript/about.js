document.addEventListener('DOMContentLoaded', initAboutPage);

function initAboutPage() {
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
  });
}
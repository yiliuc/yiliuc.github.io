/* Progressive enhancement: without JavaScript, each photograph links to its image. */
(() => {
  const dialog = document.querySelector('.photo-dialog');
  const photos = Array.from(document.querySelectorAll('.gallery-item'));
  if (!dialog || typeof dialog.showModal !== 'function' || !photos.length) return;

  const image = dialog.querySelector('.dialog-image');
  const details = dialog.querySelector('#viewer-details');
  const count = dialog.querySelector('[data-photo-count]');
  const previous = dialog.querySelector('[data-previous]');
  const next = dialog.querySelector('[data-next]');
  let current = 0;
  let opener = null;

  const showPhoto = (index) => {
    current = index;
    const photo = photos[current];
    const thumbnail = photo.querySelector('img');
    image.src = photo.querySelector('.photo-link').href;
    image.alt = thumbnail.alt;
    details.replaceChildren();
    photo.querySelectorAll('.photo-details').forEach((node) => {
      details.append(node.cloneNode(true));
    });
    count.textContent = `${current + 1} of ${photos.length}`;
    previous.disabled = current === 0;
    next.disabled = current === photos.length - 1;
  };

  const bindOpener = (link, index) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', (event) => {
      // Preserve open-in-new-tab/window gestures.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      showPhoto(index);
      dialog.showModal();
    });
  };
  photos.forEach((photo, index) => bindOpener(photo.querySelector('.photo-link'), index));
  document.querySelectorAll('[data-gallery-open]').forEach((link) => bindOpener(link, 0));
  dialog.querySelector('.dialog-bottom').hidden = photos.length < 2;
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => { if (current > 0) showPhoto(current - 1); });
  next.addEventListener('click', () => { if (current < photos.length - 1) showPhoto(current + 1); });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && current > 0) { event.preventDefault(); showPhoto(current - 1); }
    if (event.key === 'ArrowRight' && current < photos.length - 1) { event.preventDefault(); showPhoto(current + 1); }
  });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  dialog.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
})();

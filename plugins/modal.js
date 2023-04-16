Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

function noop() {}

function _createModalFuter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div');
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');
  buttons.forEach((btn) => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add('btn');
    $btn.classList.add(`btn-${btn.type || 'secondary'}`);
    $btn.onclick = btn.handler || noop;
    wrap.appendChild($btn);
  });
  return wrap;
}

function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML(
    'afterbegin',
    `
	<div class="modal-overlay" data-close="true">
	<div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
	  <div class="modal-header">
	    <span class="modal-titile" data-title>${options.title || 'Окно'}</span>
	    ${
        options.closable
          ? `<span class="modal-close" data-close="true">&times;</span>`
          : ' '
      }
	  </div>
	  <div class="modal-body" data-content>
	    ${options.content || ' '}
	  </div>
	</div>
   </div>
   `
  );

  const footer = _createModalFuter(options.footerButtens);
  footer.appendAfter(modal.querySelector('[data-content]'));
  document.body.appendChild(modal);

  return modal;
}

/*
 * title: string +
 * closable: boolean +
 * content: string +
 * width: string ('400px) +
 * destroy(): void +
 * Окно должно закрываться +
 * ----------------------------
 * setContent (html: string): void | PUBLIC +
 * onClose(): void
 * onOpen(): void
 * beforeClose(): boolean
 * ----------------------------
 * animate.css
 */

$.modal = function (options) {
  const ANIMATION_SPEED = 300;
  const $modal = _createModal(options);
  let clousing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed');
      }
      !clousing && $modal.classList.add('open');
    },
    close() {
      clousing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        clousing = false;
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED);
    },
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    },
    setTitle(title) {
      $modal.querySelector('[data-title]').innerHTML = title;
    },
  });
};

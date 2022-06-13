import { makeImageDataFromImgElement } from './Utils';

import styles from './styles.scss';

window.addEventListener('load', async () => {
  document.body.className = styles.body;

  const imagesToInvert = document.querySelectorAll('#invert tr img');

  imagesToInvert.forEach((row: Element) => {
    makeImageDataFromImgElement(row as HTMLImageElement);
  });
});

function createElement(tagName: keyof HTMLElementTagNameMap, innerHTML?: string, options?: ElementCreationOptions) {
  const element = document.createElement(tagName, options);

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

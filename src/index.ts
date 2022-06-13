import { makeImageDataFromImgElement, invertImage } from './Utils';

import styles from './styles.scss';

window.addEventListener('load', async () => {
  document.body.className = styles.body;

  const imagesToInvert = document.querySelectorAll('#invert tr img');

  imagesToInvert.forEach((row: Element, i: number) => {
    const imageData = makeImageDataFromImgElement(row as HTMLImageElement);
    invertImage(imageData);
  });
});

function createElement(tagName: keyof HTMLElementTagNameMap, innerHTML?: string, options?: ElementCreationOptions) {
  const element = document.createElement(tagName, options);

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

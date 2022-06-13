import { makeImageDataFromImgElement, invertImage } from './Utils';

import styles from './styles.scss';

window.addEventListener('load', async () => {
  document.body.className = styles.body;

  const imagesToInvert = document.querySelectorAll('#transform tr img');

  imagesToInvert.forEach((row: Element, i: number) => {
    const imageData = makeImageDataFromImgElement(row as HTMLImageElement);
    const transformedImage = invertImage(imageData);

    const canvas: HTMLCanvasElement | null = document.querySelector(`#transform tr:nth-child(${i + 2}) canvas.invert`);

    if (canvas) {
      canvas.width = transformedImage.width;
      canvas.height = transformedImage.height;

      canvas.getContext('2d')?.putImageData(transformedImage, 0, 0);
    }
  });
});

function createElement(tagName: keyof HTMLElementTagNameMap, innerHTML?: string, options?: ElementCreationOptions) {
  const element = document.createElement(tagName, options);

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

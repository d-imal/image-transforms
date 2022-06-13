import styles from './styles.scss';

window.addEventListener('load', async () => {
  document.body.className = styles.body;

  document.body.appendChild(createElement('div', 'hello'));
});

function createElement(tagName: keyof HTMLElementTagNameMap, innerHTML?: string, options?: ElementCreationOptions) {
  const element = document.createElement(tagName, options);

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

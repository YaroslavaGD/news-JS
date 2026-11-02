export const getElementBySelector = <T extends Element>(selector: string, parentNode: ParentNode = document): T => {
  const element = parentNode.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found.`);
  }
  return element;
};

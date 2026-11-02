import './sources.css';
import { type Source } from '../../types';
import { getElementBySelector } from '../../utils';

type SourceItem = Pick<Source, 'id' | 'name'>;

class Sources {
  public draw(data: SourceItem[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = getElementBySelector<HTMLTemplateElement>('#sourceItemTemp');
    const sourcesContainer = getElementBySelector<HTMLElement>('.sources');

    data.forEach((item) => {
      const sourceClone = document.importNode(sourceItemTemp.content, true);
      const sourceItemElement = getElementBySelector<HTMLElement>('.source__item', sourceClone);
      const sourceItemNameElement = getElementBySelector<HTMLElement>('.source__item-name', sourceClone);

      sourceItemNameElement.textContent = item.name;
      sourceItemElement.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    sourcesContainer.append(fragment);
  }
}

export default Sources;

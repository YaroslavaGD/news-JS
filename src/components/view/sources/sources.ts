import './sources.css';
import { type Source } from '../../types';

type SourceItem = Pick<Source, 'id' | 'name'>;

class Sources {
    public draw(data: SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer = document.querySelector('.sources');

        if (!sourcesContainer) {
            console.error('Container element with class "sources" not found.');
            return;
        }

        if (!sourceItemTemp) {
            console.error('Template element with id "sourceItemTemp" not found.');
            return;
        }

        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);

            const sourceItemElement = sourceClone.querySelector('.source__item');
            if (!sourceItemElement) {
                console.error('Element with class "source__item" not found in the template.');
                return;
            }

            const sourceItemNameElement = sourceClone.querySelector('.source__item-name');
            if (!sourceItemNameElement) {
                console.error('Element with class "source__item-name" not found in the template.');
                return;
            }

            sourceItemNameElement.textContent = item.name;
            sourceItemElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        sourcesContainer.append(fragment);
    }
}

export default Sources;

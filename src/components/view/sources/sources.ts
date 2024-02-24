import './sources.css';

interface DataItem {
    name: string;
    id: string;
}

class Sources {
    draw(data: DataItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error("Element with id 'sourceItemTemp' not found.");
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceNameElement = sourceClone.querySelector('.source__item-name');
            if (sourceNameElement) {
                sourceNameElement.textContent = item.name;
            }

            const sourceElement = sourceClone.querySelector('.source__item');
            if (sourceElement) {
                sourceElement.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesElement = document.querySelector<HTMLElement>('.sources');
        if (sourcesElement) {
            sourcesElement.append(fragment);
        }
    }
}

export default Sources;

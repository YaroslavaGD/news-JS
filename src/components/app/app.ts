import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getElementBySelector } from '../utils';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        this.setupMenu();
        getElementBySelector<HTMLElement>('.sources').addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data))
        );
        this.controller.getSources((data) => this.view.drawSources(data));

        const searchInput = getElementBySelector<HTMLInputElement>('.sources-search');
        searchInput.addEventListener('input', () => this.view.filterSources(searchInput.value));
    }

    private setupMenu(): void {
        const burger = getElementBySelector<HTMLButtonElement>('.burger');
        const sidebar = getElementBySelector<HTMLElement>('.sidebar');
        const overlay = getElementBySelector<HTMLElement>('.overlay');

        const toggle = (isOpen: boolean): void => {
            sidebar.classList.toggle('open', isOpen);
            overlay.classList.toggle('visible', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
            document.documentElement.classList.toggle('no-scroll', isOpen);
        };

        burger.addEventListener('click', () => toggle(!sidebar.classList.contains('open')));
        overlay.addEventListener('click', () => toggle(false));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') toggle(false);
        });
        getElementBySelector('.sources', sidebar).addEventListener('click', (e) => {
            if (e.target instanceof HTMLElement && e.target.closest('.source__item')) toggle(false);
        });
    }
}

export default App;

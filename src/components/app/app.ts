import AppController from '../controller/controller';
import { AppView } from '../view/appView';

interface Article {
    title: string;
    content: string;
}

type Data = Article[];

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e) => this.controller.getNews(e, (data: Data) => this.view.drawNews(data)));
        this.controller.getSources((data: Data) => this.view.drawSources(data));
    }
}

export default App;
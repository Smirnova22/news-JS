import News from './news/news';
import Sources from './sources/sources';

interface Article {
    title: string;
    content: string;
}

interface Source {
    name: string;
    id: string;
}

export class AppView {
    news: News;

    constructor() {
        this.news = new News();
    }

    drawNews(data: { articles?: Article[] }): void {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: { sources?: Source[] }): void {
        const values = data?.sources ? data.sources : [];
        Sources.draw(values); // Directly use the Sources class's draw method
    }
}

export default AppView;

import News from './news/news';
import Sources from './sources/sources';

interface Article {
    title: string;
    url: string;
    source: { name: string }; 
    publishedAt: string;
    description: string;
}

interface Source {
    id: string;
    name: string;
    url: string;
}

interface Data {
    articles?: Article[];
    sources?: Source[];
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Data): void {
        const values = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: Data): void {
        const values = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

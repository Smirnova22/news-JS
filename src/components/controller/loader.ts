type LoaderOptions = {
    [key: string]: string | undefined | null;
};

type RequestOptions = {
    endpoint: string;
    options?: LoaderOptions;
};

interface Article {
    title: string;
    content: string;
}

type Data = Article[];

type Callback = (data: Data) => void;

class Loader {
    private baseLink: string;
    private options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options = {} }: RequestOptions, callback: Callback = () => {
        console.error('No callback for GET response');
    }) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status ===  401 || res.status ===  404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: LoaderOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback, options: LoaderOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;

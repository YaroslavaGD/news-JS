import { Endpoint, type Callback, type EverythingResponse, type SourcesResponse } from '../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp(
            {
                endpoint: Endpoint.SOURCES,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: Callback<EverythingResponse>): void {
        let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;
        if (!target) {
            console.error('Event target is not an HTMLElement');
            return;
        }
        const newsContainer = e.currentTarget;
        if (!(newsContainer instanceof HTMLElement)) {
            console.error('Event currentTarget is not an HTMLElement');
            return;
        }

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;

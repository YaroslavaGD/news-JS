import type { Article } from '../../types';
import { getElementBySelector } from '../../utils';
import './news.css';

const NEWS_LIMIT = 10;

type NewsItem = Pick<Article, 'source' | 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt'>;

class News {
  public draw(data: NewsItem[]): void {
    const news = data.slice(0, NEWS_LIMIT);

    const fragment = document.createDocumentFragment();
    const newsItemTemp = getElementBySelector<HTMLTemplateElement>('#newsItemTemp');
    const newsContainer = getElementBySelector<HTMLElement>('.news');

    news.forEach((item, idx) => {
      const newsClone = document.importNode(newsItemTemp.content, true);

      if (idx % 2) {
        const newsItemElement = getElementBySelector('.news__item', newsClone);
        newsItemElement.classList.add('alt');
      }

      const newsMetaPhoto = getElementBySelector<HTMLElement>('.news__meta-photo', newsClone);
      newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const newsMetaAuthor = getElementBySelector('.news__meta-author', newsClone);
      newsMetaAuthor.textContent = item.author || item.source.name;

      const newsMetaDate = getElementBySelector('.news__meta-date', newsClone);
      newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const newsDescriptionTitle = getElementBySelector('.news__description-title', newsClone);
      newsDescriptionTitle.textContent = item.title;

      const newsDescriptionSource = getElementBySelector('.news__description-source', newsClone);
      newsDescriptionSource.textContent = item.source.name;

      const newsDescriptionContent = getElementBySelector('.news__description-content', newsClone);
      newsDescriptionContent.textContent = item.description;

      const newsReadMoreLink = getElementBySelector<HTMLAnchorElement>('.news__read-more a', newsClone);
      newsReadMoreLink.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    newsContainer.innerHTML = '';
    newsContainer.appendChild(fragment);
  }
}

export default News;

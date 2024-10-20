import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getAllPhotos } from './js/pixabay-api';
import { createItem } from './js/render-functions';

const formEl = document.querySelector('#js-form');
const inputEl = document.querySelector('#js-input');
const galleryEl = document.querySelector('#js-gallery');
const loaderEl = document.querySelector('.loader');
const btnLoadMoreEl = document.querySelector('#js-btn-load-more');

const gallery = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: 'alt' });

const params = {
  page: 1,
  perPage: 15,
  query: '',
  totalPages: 1,
};

formEl.addEventListener('submit', handleSearch);

async function handleSearch(e) {
  e.preventDefault();
  const query = inputEl.value.trim();
  params.query = query;
  galleryEl.innerHTML = '';

  if (query === '') {
    formEl.reset();
    return;
  }
  loaderEl.classList.add('block');
  btnLoadMoreEl.classList.remove('block');
  params.page = 1;

  try {
    const data = await getAllPhotos(params);

    const totalHits = data.totalHits;
    params.totalPages = Math.ceil(totalHits / params.perPage);

    if (data.hits.length === 0) {
      return iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }

    galleryEl.innerHTML = data.hits.map(createItem).join('');
    gallery.refresh();

    if (params.totalPages > params.page) {
      btnLoadMoreEl.classList.add('block');
      btnLoadMoreEl.addEventListener('click', handleClickBtnLoadMore);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching the images. Please try again later!',
      position: 'topRight',
    });
  } finally {
    loaderEl.classList.remove('block');
    formEl.reset();
  }
}

async function handleClickBtnLoadMore() {
  params.page += 1;
  btnLoadMoreEl.textContent = 'Loading...';
  btnLoadMoreEl.disabled = true;
  btnLoadMoreEl.classList.add('cursor');

  try {
    const { hits } = await getAllPhotos(params);
    const markup = hits.map(createItem).join('');
    galleryEl.insertAdjacentHTML('beforeend', markup);
    gallery.refresh();
    const cardEl = document.querySelector('.gallery-item');
    const { height } = cardEl.getBoundingClientRect();
    window.scrollBy({
      top: height * 6,
      behavior: 'smooth',
    });
    btnLoadMoreEl.textContent = 'Load more';
    btnLoadMoreEl.disabled = false;
    btnLoadMoreEl.classList.remove('cursor');

    if (params.totalPages === params.page) {
      btnLoadMoreEl.classList.remove('block');
      btnLoadMoreEl.removeEventListener('click', handleClickBtnLoadMore);
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching the images. Please try again later!',
      position: 'topRight',
    });
  }
}

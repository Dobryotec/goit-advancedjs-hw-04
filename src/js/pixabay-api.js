import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const getAllPhotos = async ({ page, perPage, query }) => {
  const params = {
    page,
    per_page: perPage,
    q: query,
    key: '33694347-6ae8de5621b95f7febdf77706',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const res = await axios.get('', { params });

  return res.data;
};

export { getAllPhotos };

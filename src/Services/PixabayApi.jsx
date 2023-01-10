import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});
const API_KEY = '31920249-48aeedfd8265761d2665a6f22';
async function getGallery(query, page = 1) {
  const { data } = await instance.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=15`
  );
  return data;
}
export default getGallery;

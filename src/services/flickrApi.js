import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPhotos = async (search, retries = 3) => {
  const PROXY_URL = "https://api.allorigins.win/get?url=";
  const FLICKR_URL = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${encodeURIComponent(search)}&_t=${Date.now()}`;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(PROXY_URL + encodeURIComponent(FLICKR_URL));
      if (!response.data || !response.data.contents) throw new Error("No data");

      const data = JSON.parse(response.data.contents);
      return data.items || [];
    } catch (error) {
      if (i === retries - 1) throw error;
      console.warn(`Tentativa ${i + 1} eșuată. Reîncercăm...`);
      await delay(1000);
    }
  }
};
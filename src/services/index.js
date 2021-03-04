const getBeers = (page, size) => {
  let url = "https://api.punkapi.com/v2/beers";

  if (page > 0 && size > 0) url = `${url}?page=${page}&per_page=${size}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
};

// fake api
const getTotalNumOfBeers = () => {
  return 50;
};

export { getBeers, getTotalNumOfBeers };

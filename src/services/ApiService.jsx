export function ApiService(name, perPage) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=1&key=29410292-59e4a7ff95dc91ff3e6fefd55&image_type=photo&orientation=horizontal&per_page=${perPage}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

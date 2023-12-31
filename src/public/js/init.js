const LOGIN_URL = '/login';
const CATEGORIES_URL = '/api/cats';
const PUBLISH_PRODUCT_URL = '/api/sell/publish.json';
const PRODUCTS_URL = '/api/cats_products/';
const PRODUCT_INFO_URL = '/api/products/';
const PRODUCT_INFO_COMMENTS_URL = '/api/products_comments/';
const CART_INFO_URL = '/api/cart';
const CART_BUY_URL = '/api/cart/buy.json';
const EXT_TYPE = '.json';

const showSpinner = () => document.getElementById('spinner-wrapper').style.display = 'block';
const hideSpinner = () => document.getElementById('spinner-wrapper').style.display = 'none';

const authenticate = async () => {
	const res = await fetch(LOGIN_URL, {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			'charset': 'utf-8',
		},
		body: JSON.stringify({
			username: 'admin',
			password: 'admin'
		}),
	});

	const { token } = await res.json();
	return token;
}

const getJSONData = (url) => {
  const result = {};
  showSpinner();
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    })
    .then((res) => {
      result.status = 'ok';
      result.data = res;
      hideSpinner();
      return result;
    })
    .catch((error) => {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('user');
  if (!user) location.href = 'login.html';
  
  const profile = document.getElementById('profile');
  profile.textContent = user;

  let theme = localStorage.getItem('theme') ?? 'light';
  const jumbotron = document.getElementById('jumbotron');

  if (jumbotron && theme === 'dark') jumbotron.classList.add('jumbotron-dark');
  document.body.setAttribute('data-bs-theme', theme);

  document.getElementById('theme').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);

    if (jumbotron) jumbotron.classList.toggle('jumbotron-dark');
    document.body.setAttribute('data-bs-theme', theme);
  });
  
  document.getElementById('logout').addEventListener('click', () => localStorage.removeItem('user'));
});
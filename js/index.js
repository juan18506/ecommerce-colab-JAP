const user = window.localStorage.getItem('user')
if (!user) window.location.href = 'login.html'

document.getElementById('autos').addEventListener('click', function () {
  window.localStorage.setItem('catID', 101)
  window.location = 'products.html'
})

document.getElementById('juguetes').addEventListener('click', function () {
  window.localStorage.setItem('catID', 102)
  window.location = 'products.html'
})

document.getElementById('muebles').addEventListener('click', function () {
  window.localStorage.setItem('catID', 103)
  window.location = 'products.html'
})

document.getElementById('cerrar-sesion').addEventListener('click', function () {
  window.localStorage.removeItem('user')
})
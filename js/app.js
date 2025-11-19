(async function(){
  async function getProducts(){
    const r = await fetch('/products.json');
    const l = await r.json();
    return l;
  }
  const products = await getProducts();

  // Featured on home (first 8)
  const featured = document.getElementById('featuredGrid');
  if(featured){
    featured.innerHTML = products.slice(0,8).map(p=>`
      <div class="card">
        <img src="${(p.images&&p.images[0])||'/images/placeholder.jpg'}" alt="${p.name}">
        <div class="p">
          <h3>${p.name}</h3>
          <p class="small">${p.description||''}</p>
          <a class="btn" href="/pages/product.html?id=${encodeURIComponent(p.id)}">View Gallery</a>
        </div>
      </div>
    `).join('');
  }

  // Products page grid
  const grid = document.getElementById('productsGrid');
  if(grid){
    grid.innerHTML = products.map(p=>`
      <div class="card">
        <img src="${(p.images&&p.images[0])||'/images/placeholder.jpg'}" alt="${p.name}">
        <div class="p">
          <h3>${p.name}</h3>
          <p class="small">${p.description||''}</p>
          <a class="btn" href="/pages/product.html?id=${encodeURIComponent(p.id)}">View Gallery</a>
        </div>
      </div>
    `).join('');
  }

  // Product detail page
  const productDetail = document.getElementById('productDetail');
  if(productDetail){
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const p = products.find(x=>String(x.id)===String(id));
    if(p){
      productDetail.innerHTML = `
  <div class="card" style="box-shadow:none">
    <img src="${p.images[0] || '/images/placeholder.jpg'}" alt="${p.name}">
    <div class="p">
      <h2>${p.name}</h2>
      <p>${p.description || ''}</p>

      <div style="display:flex;gap:10px;margin-top:12px">
        ${p.images.map(function(i){
          return '<img src="' + i + '" style="width:100px;height:80px;object-fit:cover;border-radius:8px">';
        }).join('')}
      </div>

    </div>
  </div>
`;
    } else {
      productDetail.innerHTML = '<p>Product not found.</p>';
    }
  }
})();
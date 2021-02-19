let users = [];
let albums = [];

async function getUsers(){
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
}

getUsers().then(array => {
  array.forEach(item => {
    let user = {id:item.id, username:item.username, email:item.email};
    users.push(user);
  });
  getAlbums();
});

async function getAlbums(){
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const data = await response.json();
    return data;
  }
  
  getAlbums().then(array => {
    array.forEach(item => {
      let album = {userId:item.userId, title:item.title};
      albums.push(album);
    });
  });

function showAlbums(){
  let out = ``;
  let outside = ``;

  let tmp = 0; //users[0].id = 1 <-- !
  out += createAlbumLink(tmp);
  outside += createSideLink(tmp);

  albums.forEach(item =>{
    if((tmp+1) != item.userId){
      tmp++;
      out+= createAlbumLink(tmp);
      outside+= createSideLink(tmp);
    } else {
      out+= createAlbum(tmp);
    }
   });

  document.getElementById('albums').innerHTML = out;
  document.getElementById('sideelements').innerHTML = outside;
}

function createSideLink(index){
  return `<div><a class="sideitem" href="#${users[index].email}">${users[index].username}</div>`;
}

function createAlbum(index){
  return `
  <div class="card my-2" style="width: 15rem;">
    <img class="card-img-top" src="https://picsum.photos/seed/{${getSeed()}}picsum/200/300?grayscale">
    <div class="card-body">
    <h5 class="card-title">${users[index].username}</h5>
    <h5 class="card-title">${users[index].email}</h5>
    <p class="card-text">${albums[index].title}</p>
    </div>
  </div>
  `;
}

function createAlbumLink(index){
  return `
  <div class="card my-2" style="width: 15rem;">
    <a name="${users[index].email}"></a>
    <img class="card-img-top" src="https://picsum.photos/seed/{${getSeed()}}picsum/200/300?grayscale">
    <div class="card-body">
    <h5 class="card-title">${users[index].username}</h5>
    <h5 class="card-title">${users[index].email}</h5>
    <p class="card-text">${albums[index].title}</p>
    </div>
  </div>
  `;
}

function getSeed(){
  return Math.floor(Math.random() * 10000);
}

getUsers();

setTimeout(function(){
  showAlbums();
}, 1500);
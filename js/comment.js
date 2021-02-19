let comments = [];
let numberOfComments = document.getElementById('myNumberOfComments');

async function getComments(){
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const data = await response.json();
  return data;
}

getComments().then(array => {
  array.forEach(item => {
    //let comment = [item.name,item.email,item.body];
    let comment = {name:item.name, email:item.email, body:item.body};
    comments.push(comment);
  });
  //document.getElementById('myNumberOfComments').max = comments.length;
  showComments();
});

function showComments(){
  let out = ``;
  let i=0;
  do{
    if(document.getElementById('myText').value == "" || comments[i].email.includes(document.getElementById('myText').value)){
      out+= ` 
            <tr><td class="rounded">
              <div class="">
                <h1 class="">${comments[i].name}</h1>
                <h3 class="">${comments[i].email}</h3>
                <p>${comments[i].body}</p>
              </div>
            </td></tr>
            `;
    }

    i++;
  }while(i != document.getElementById('myNumberOfComments').value && i != comments.length);
  if(out.length != 0 && document.getElementById('myText').value == "") {
    document.getElementById('myText').className = "";
  } else if(out.length != 0) {
    document.getElementById('myText').className = "bg-success";
  }else {
    document.getElementById('myText').className = "bg-danger";
  }
  document.getElementById('comments').innerHTML = out;
}

getComments();
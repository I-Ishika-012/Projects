 const container= document.querySelector('.container');
 const title = document.querySelector('.title');
 const btn = document.querySelector('#btn');

 //?making http request

 //!getting endpont of server/api

 const url = 'https://jsonplaceholder.typicode.com/posts';
// fetch(url)
// .then(res => {
//     res.json().then(data => 
//         console.log(data));
//     })
// .catch(err => {
//     console.log(err);
// })

const fetchPost = async () => {
    try {
        const res = await fetch(url);
        const data = await res.json();
    //! displaying posts to DOM
     const disp = data.map((post) => {
         return `
         <div class="card">
         <div class="card-title">
            <h2>${post.title}</h2>
         </div>
         <div class="card-body">
             <p>${post.body}</p>
         </div>
         </div>
         `;
     });
     
     container.innerHTML = disp.join("");
} catch (err) {
     console.log(err); 
    } 
};

btn.addEventListener("click", fetchPost);
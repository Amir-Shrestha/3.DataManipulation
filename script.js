const all_users = [
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true,
  },
  {
    userId: 2,
    id: 21,
    title: "suscipit repellat esse quibusdam voluptatem incidunt",
    completed: false,
  },
  {
    userId: 2,
    id: 22,
    title: "distinctio vitae autem nihil ut molestias quo",
    completed: true,
  },
  {
    userId: 2,
    id: 23,
    title: "et itaque necessitatibus maxime molestiae qui quas velit",
    completed: false,
  },
  {
    userId: 2,
    id: 24,
    title: "adipisci non ad dicta qui amet quaerat doloribus ea",
    completed: false,
  },
  {
    userId: 3,
    id: 41,
    title:
      "aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit",
    completed: false,
  },
  {
    userId: 3,
    id: 42,
    title: "rerum perferendis error quia ut eveniet",
    completed: false,
  },
  {
    userId: 3,
    id: 43,
    title: "tempore ut sint quis recusandae",
    completed: true,
  },
  {
    userId: 3,
    id: 44,
    title: "cum debitis quis accusamus doloremque ipsa natus sapiente omnis",
    completed: true,
  },
  {
    userId: 4,
    id: 61,
    title: "odit optio omnis qui sunt",
    completed: true,
  },
  {
    userId: 4,
    id: 62,
    title: "et placeat et tempore aspernatur sint numquam",
    completed: false,
  },
  {
    userId: 4,
    id: 63,
    title: "doloremque aut dolores quidem fuga qui nulla",
    completed: true,
  },
  {
    userId: 4,
    id: 65,
    title: "fugiat pariatur ratione ut asperiores necessitatibus magni",
    completed: false,
  },
  {
    userId: 5,
    id: 81,
    title: "suscipit qui totam",
    completed: true,
  },
  {
    userId: 5,
    id: 82,
    title: "voluptates eum voluptas et dicta",
    completed: false,
  },
  {
    userId: 5,
    id: 83,
    title: "quidem at rerum quis ex aut sit quam",
    completed: true,
  },
  {
    userId: 5,
    id: 84,
    title: "sunt veritatis ut voluptate",
    completed: false,
  },
  {
    userId: 6,
    id: 101,
    title: "explicabo enim cumque porro aperiam occaecati minima",
    completed: false,
  },
  {
    userId: 6,
    id: 102,
    title: "sed ab consequatur",
    completed: false,
  },
  {
    userId: 6,
    id: 103,
    title: "non sunt delectus illo nulla tenetur enim omnis",
    completed: false,
  },
  {
    userId: 6,
    id: 104,
    title: "excepturi non laudantium quo",
    completed: false,
  },
  {
    userId: 6,
    id: 105,
    title: "totam quia dolorem et illum repellat voluptas optio",
    completed: true,
  },
];

const unique_users_id = [];im
for (let i = 0; i < all_users.length; i++) {
  if (unique_users_id.includes(all_users[i].userId) == false) {
    unique_users_id.push(all_users[i].userId);
  }
}
// console.log(unique_users_id)

const unique_users = [];
for (let i = 0; i < unique_users_id.length; i++) {
  unique_users.push({ user_Id: unique_users_id[i] });
}
// console.log(unique_users)

for (let i = 0; i < unique_users.length; i++) {
  unique_users[i].titles = [];
}
// console.log(unique_users)

// for (let i = 0; i < unique_users.length; i++) {
//     unique_users[i].titles.push({"title": "Cat","status": "complete"})
// }
// console.log(unique_users)

for (let i = 0; i < unique_users.length; i++) {
  for (let j = 0; j < all_users.length; j++) {
    if (unique_users[i].user_Id == all_users[j].userId) {
      unique_users[i].titles.push({
        title: all_users[j].title,
        completed: all_users[j].completed,
      });
    }
  }
}
// console.log(unique_users);


for (let i = 0; i < unique_users.length; i++) {

    // Create new div element with className = 'user-detial'
    var user_div = document.createElement('div');
    user_div.className = 'user-detial';

    // Create (h3 tag and ol tag) with innerHTML
    var h3 = document.createElement('H3')
    h3.innerHTML = "User Id: "+unique_users[i].user_Id;

    var ol = document.createElement('ol')
    ol.setAttribute('type','1');

    // // Append created (h3 tag  and two ol tags) into newly created div element with className = 'user-detial'
    user_div.appendChild(h3);
    user_div.appendChild(ol);

    // Appeend list of titlle of particular user to its respective ol tag
    for(let j = 0; j < unique_users[i].titles.length; j++){
        var li = document.createElement('li')
        var s = document.createElement('s')
        if(unique_users[i].titles[j].completed == true){
          s.innerHTML = unique_users[i].titles[j].title;
        }
        else{
          li.innerHTML = unique_users[i].titles[j].title;
        }
        ol.appendChild(li);
        li.appendChild(s);
      }

    // Finally append newly created div element with className('user-detial') into avialable div element with className(user)
    document.getElementById("users").appendChild(user_div);
}


// users_dropdown in sreach form
for(let i=0; i<unique_users.length; i++)
{
  var option = document.createElement('option')
  option.innerHTML = "User Id: "+unique_users[i].user_Id;
  document.getElementById('user_dropdown').appendChild(option);
}
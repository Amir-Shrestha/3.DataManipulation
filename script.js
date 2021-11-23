alert("Main JavaScript run!")
const all_users = [];

let url = "https://jsonplaceholder.typicode.com/todos";
// 1fetch json_data and change it into suitable format so that it can be easily shown in template
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (all_users) {
    // 1.1 get all unique user id
    const unique_users_id = [];
    for (let i = 0; i < all_users.length; i++) {
      if (unique_users_id.includes(all_users[i].userId) == false) {
        unique_users_id.push(all_users[i].userId);
      }
    }

    // 1.2 create new array(unique_users) of objects containning (user_Id:1)key:value pairs for all the id in unique_users_id list/array
    const unique_users = [];
    for (let i = 0; i < unique_users_id.length; i++) {
      unique_users.push({ user_Id: unique_users_id[i] }); // 1.3 add new titles(array) property to the all object inside unique_users array
      unique_users[i].titles = [];
    }

    //1.4 push all the title of objects in json_data into new titles(array) property created to the all object inside unique_users array
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

    //1.5 push all objects of unique_users into users(custome user created array)
    unique_users.map(function (user_obj) { all_users.push(user_obj) });

    alert("1. Data Fetched !")

    userList(unique_users);
    displayUser(unique_users); //************************

  });

function userList(all_users){
  // 3 users_dropdown in sreach form
  for (let i = 0; i < all_users.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = "User Id: " + all_users[i].user_Id;
    document.getElementById("user_dropdown").appendChild(option);
  }
}

function sortUser() {
  alert("2. Sort Users!");
  const sorted_users = [];
  displayUser(sorted_users);
}

function displayUser(users) {
  console.log("3. Display Users!");
  // 2 create div for all unique user
  for (let i = 0; i < users.length; i++) {
    // 2.1 Create new div element with className = 'user-detial'
    var user_div = document.createElement("div");
    user_div.className = "user-detial";

    // 2.2 Create (h3 tag and ol tag) with innerHTML
    var h3 = document.createElement("H3");
    h3.innerHTML = "User Id: " + users[i].user_Id;

    var ol = document.createElement("ol");
    ol.setAttribute("type", "1");

    // 2.3 Append created (h3 tag  and two ol tags) into newly created div element with className = 'user-detial'
    user_div.appendChild(h3);
    user_div.appendChild(ol);

    // 2.4 Appeend list of titlle of particular user to its respective ol tag
    for (let j = 0; j < users[i].titles.length; j++) {
      var li = document.createElement("li");
      var s = document.createElement("s");
      if (users[i].titles[j].completed == true) {
        s.innerHTML = users[i].titles[j].title;
      } else {
        li.innerHTML = users[i].titles[j].title;
      }
      ol.appendChild(li);
      li.appendChild(s);
    }

    // 2.5 Finally append newly created div element with className('user-detial') into avialable div element with className(user)
    document.getElementById("users").appendChild(user_div);
  }
}

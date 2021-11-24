const custome_users = [];

// 1. fetch json_data and change it into suitable format so that it can be easily shown in template
let url = "https://jsonplaceholder.typicode.com/todos";
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
    // unique_users.map(function (user_obj) { custome_users.push(user_obj) });
    for (i = 0; i < unique_users.length; i++) {
      custome_users.push(unique_users[i]);
    }
    userDropdownList();
    displayUser(unique_users);
  });

// 2. users_dropdown in sreach form
function userDropdownList() {
  for (let i = 0; i < custome_users.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = "User Id: " + custome_users[i].user_Id;
    option.value = custome_users[i].user_Id;
    document.getElementById("userDropdown").appendChild(option);
  }
}

// 4. Sort user according to value passed from search form
function sortUser() {
  // 4.1 get the sort value from searchForm
  var selectBox1 = document.getElementById("userDropdown");
  var selectedUser = selectBox1.value;
  var selectBox2 = document.getElementById("statusDropdown");
  var selectedStatus = selectBox2.value;

  //4.2 create new array(filteredUsers) and filter the user from custome_users according to given sort value from searchForm
  var filteredUsers = [];
  var sort_a_user = false;

  //sort to user
  if (selectedUser === "all_users") {
    filteredUsers = custome_users.map((user_obj) => ({ ...user_obj }));
  } else {
    filteredUsers = custome_users.filter(
      (user_obj) => user_obj.user_Id == selectedUser
    );
    sort_a_user = true;
  }

  //sort according to status
  if (selectedStatus == "completed") {
    filteredUsers = getFilteredByStatus(filteredUsers, true);
  } else if (selectedStatus == "incomplete") {
    filteredUsers = getFilteredByStatus(filteredUsers, false);
  }
  displayUser(filteredUsers, true);
  return;
}

function getFilteredByStatus(filteredUsers, status) {
  return filteredUsers.map((user_obj) => {
    return {
      ...user_obj,
      titles: user_obj.titles.filter(
        (title_obj) => title_obj.completed == status
      ),
    };
  });
}

//3. Create div for all unique users and display them
function displayUser(users, sort = false) {
  for (let i = 0; i < users.length; i++) {
    // 3.1 Create new div element with className = 'user-detial'
    var user_div = document.createElement("div");
    user_div.className = "user-detial";

    // 3.2 Create (h3 tag and ol tag) with innerHTML
    var h3 = document.createElement("H3");
    h3.innerHTML = "User Id: " + users[i].user_Id;

    var ol = document.createElement("ol");
    ol.setAttribute("type", "1");

    // 3.3 Append created (h3 tag  and two ol tags) into newly created div element with className = 'user-detial'
    user_div.appendChild(h3);
    user_div.appendChild(ol);

    // 3.4 Appeend list of titlle of particular user to its respective ol tag
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

    // 3.5 Finally append newly created div element with className('user-detial') into avialable div element with className(user)
    if (sort) {
      document.getElementById("users").replaceChildren(user_div);
      sort = false;
    } else {
      document.getElementById("users").appendChild(user_div);
    }
  }
}

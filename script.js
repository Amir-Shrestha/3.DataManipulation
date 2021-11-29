const customeUsers = [];

// 1. fetch json_data and change it into suitable format so that it can be easily shown in template
let url = "https://jsonplaceholder.typicode.com/todos";
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (allUsers) {
    // 1.1 get all unique user id
    const uniqueUserId = [];
    allUsers.forEach((uniqueUser) => {
      if (uniqueUserId.includes(uniqueUser.userId) == false) {
        uniqueUserId.push(uniqueUser.userId);
      }
    });
    // allUsers.forEach((uniqueUser) =>
    //   uniqueUserId.push(uniqueUser.userId)
    //     ? uniqueUserId.includes(uniqueUser.userId) == false
    //     : pass
    // );

    // 1.2 create new array(uniqueUsersObj) of objects containning (userId:1)key:value pairs for all the id in uniqueUserId list/array
    const uniqueUsersObj = uniqueUserId.map((id) => {
      return {
        userId: id,
        tasks: [],
      };
    });

    //1.4 push all the title_property of objects_in_json_data into new tasks(array)_property created to the all_object_inside_uniqueUsersObj array
    uniqueUsersObj.forEach((userObj) =>
      allUsers.forEach((user) => {
        if (userObj.userId == user.userId) {
          userObj.tasks.push({
            title: user.title,
            completed: user.completed,
          });
        }
      })
    );

    // here, in 1.4 syntac of two arrays(uniqueUsersObj and allUsers)
    // allUsers = [
    //   {
    //     userId: 1,
    //     title: "abc",
    //   },
    //   {
    //     userId: 2,
    //     title: "def",
    //   },
    // ];
    // and,
    // uniqueUsersObj = [
    //   {
    //     userId: 1,
    //     tasks: [],
    //   },
    //   {
    //     userId: 2,
    //     tasks: [],
    //   }
    // ];

    //1.5 push all objects of uniqueUsersObj into users(customeUsers array)
    uniqueUsersObj.forEach((user) => customeUsers.push(user)); //finally create json data in new formate
    userDropdownList();
    displayUser(uniqueUsersObj);
  });

// 2. users_dropdown in sreach form
function userDropdownList() {
  customeUsers.forEach((user) => {
    var option = document.createElement("option");
    option.innerHTML = "User Id: " + user.userId;
    option.value = user.userId;
    document.getElementById("userDropdown").appendChild(option);
  });
}

// 4. Sort user according to value passed from search form
function sortUser() {
  // 4.1 get the sort value from searchForm
  var selectBox1 = document.getElementById("userDropdown");
  var selectedUser = selectBox1.value;
  var selectBox2 = document.getElementById("statusDropdown");
  var selectedStatus = selectBox2.value;

  //4.2 create new array(filteredUsers) and filter the user from customeUsers according to given sort value from searchForm
  var filteredUsers = [];
  var sort_a_user = false;

  //filter to user
  if (selectedUser == "all_users") {
    // filteredUsers = customeUsers.map((user_obj) => user_obj);
    customeUsers.forEach((user_obj) => filteredUsers.push(user_obj));
  } else {
    filteredUsers = customeUsers.filter(
      (user_obj) => user_obj.userId == selectedUser
    );
    sort_a_user = true;
  }

  //filter according to status
  if (selectedStatus != "all_status") {
    filteredUsers = filterUserByTaskStatus(
      filteredUsers,
      selectedStatus == "completed" // gives true|false
    );
  }
  displayUser(filteredUsers, true);
  return;
}

function filterUserByTaskStatus(filteredUsers, status) {
  return filteredUsers.map((user_obj) => {
    const userObjWithFilteredTask = {
      userId: user_obj.userId,
      tasks: user_obj.tasks.filter(
        (title_obj) => title_obj.completed == status
      ),
    };
    return userObjWithFilteredTask;
  });
}

//3. Create div for all unique users and display them
function displayUser(users, sort = false) {
  for (let i = 0; i < users.length; i++) {
    // 3.5 Finally append newly created div element with className('user-detial') into avialable div element with className(user)
    let user_div_open = `
    <div class="user-detial" >
    <h3>User Id: ${users[i].userId}</h3>
    <ol type="1">`;

    for (let j = 0; j < users[i].tasks.length; j++) {
      if (users[i].tasks[j].completed == true) {
        user_div_open += `
        <li><s>${users[i].tasks[j].title}</s></li>
        `;
      } else {
        user_div_open += `
        <li>${users[i].tasks[j].title}</li>
        `;
      }
    }
    let user_div_close = `</ol></div>`;
    let user_detial_div = user_div_open + user_div_close;
    if (sort) {
      document.getElementById("users").innerHTML = user_detial_div;
      sort = false;
    } else {
      document.getElementById("users").innerHTML += user_detial_div;
    }
    console.log("A_userdiv");
    // console.log(user_detial_div);
  }
}

// Back-Tics Syntax
// Template Literals use back-ticks (``) rather than the quotes ("") to define a string

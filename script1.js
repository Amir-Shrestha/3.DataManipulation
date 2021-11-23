alert("Alert before Fetch Api")

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(data => console.log(data));


alert("Alert before Fetch Api")

//why is first alert shown two times and last alert is not shown
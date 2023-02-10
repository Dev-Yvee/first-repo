var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var students = [
  { ID: 1, FirstName: "Yvone", SecondName: "Njeri", StudentID: 8391 },
  { ID: 2, FirstName: "Benson", SecondName: "Gathu", StudentID: 8392 },
  { ID: 3, FirstName: "Aburili", SecondName: "Anami", StudentID: 8393 },
];

var books = [
  { ID: 10, Title: "Tommorrow People", SerialNumber: "SN1100" },
  { ID: 11, Title: "River and the source", SerialNumber: "SN100" },
  { ID: 12, Title: "River Between", SerialNumber: "SN300" },
  { ID: 13, Title: "Betrayal in the city", SerialNumber: "SN544" },
];

function studentdetails(studentid) {
  for (let i = 0; i < students.length; i++) {
    if (students[i]["StudentID"] == studentid) {
      //console.log(studentid)
      return students[i];
    }
  }
}

var bookDetails = (bookId) => {
  for (let i = 0; i < books.length; i++) {
    if (books[i]["SerialNumber"] == bookId) {
      // console.log(books[i])
      return books[i];
    }
  }
};

app.get("/books", (req, res, next) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  //checks the specific book id
  const bookId = req.params.id;

  var bookInfo = bookDetails(bookId);
  res.json(bookInfo);
});

app.post("/books", (req, res) => {
  var { ID, Title, SerialNumber } = req.body;
  var book = req.body;
  books.push(book); //adding a books
  return res.send("Book has been succesfully added");
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookToDelete = books.find((x) => x.SerialNumber == id);
  if (bookToDelete) {
    const index = books.indexOf(bookToDelete);
    books.splice(index, 1); //deleting books
    return res.send("Book has been successfuly been deleted");
  } else {
    return res.send(`Book with the serial Number ${id} does not exist`);
  }
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id); //converting the string to int
  const bookToUpdate = books.find((el) => el.SerialNumber == id); //loop to find the book inputed

  if (!bookToUpdate) {
    return res.send(`Book with ID ${id} does not exist`);
  }
  const index = books.indexOf(bookToUpdate); // find the index of the book

  Object.assign(bookToUpdate, req.body); //updating books

  books[index] = bookToUpdate;
  return res.send(`Book with ID ${id} has been updated`);
});
//updating books
app.patch("/books/:id", (req, res) => {
  const id = parseInt(req.params.id); //converting the string to int
  const bookToUpdate = books.find((el) => el.ID == id); //loop to find the book inputed

  if (!bookToUpdate) {
    return res.send(`Book with ID ${id} does not exist`);
  }
  const index = books.indexOf(bookToUpdate); // find the index of the book

  Object.assign(bookToUpdate, req.body); //updating books

  books[index] = bookToUpdate;
  return res.send(`Book with ID ${id} has been updated`);
});

app.get("/students", (req, res, next) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  //identified the specific student   :id is a variable(input a number in the browser)
  const studentid = req.params.id;
  var studentinfo = studentdetails(studentid); //calling the function studentdetails
  res.json(studentinfo);
  // res.json(`my students id is ${id}`); // browser output
  // console.log(`my book id is ${id}`); //terminal output
});
app.post("/students", (req, res) => {
  var { ID, FirstName, SecondName, StudentID } = req.body;
  var student = req.body; //created a new student
  students.push(student); //adding the created student
  return res.send("Student has been succesfully added"); //output after adding the student
});
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const studentToDelete = students.find((x) => x.StudentID == id);
  if (studentToDelete) {
    const index = students.indexOf(studentToDelete);
    students.splice(index, 1); //deleting books
    return res.send("Student has been successfuly been deleted");
  } else {
    return res.send(`Student with the ID ${id} does not exist`);
  }
});
app.patch("/students/:id", (req, res) => {
  const id = parseInt(req.params.id); //converting the string to int
  const studentToUpdate = students.find((el) => el.StudentID == id); //loop to find the book inputed

  if (!studentToUpdate) {
    return res.send(`Student with ID ${id} does not exist`);
  }
  const index = students.indexOf(studentToUpdate); // find the index of the book

  Object.assign(studentToUpdate, req.body); //updating books

  students[index] = studentToUpdate;
  return res.send(`Student with the Student ID ${id} has been updated`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

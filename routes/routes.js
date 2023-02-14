const Model = require("../models/model");
const express = require("express");

const router = express.Router();

module.exports = router;

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

router.get("books", (req, res, next) => {
  res.json(books);
});

router.get("books/:id", (req, res) => {
  //checks the specific book id
  const bookId = req.params.id;

  var bookInfo = bookDetails(bookId);
  res.json(bookInfo);
});

router.post("books", (req, res) => {
  var { ID, Title, SerialNumber } = req.body;
  var book = req.body;
  books.push(book); //adding a books
  return res.send("Book has been succesfully added");
});

router.delete("books/:id", (req, res) => {
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

router.put("api/books/:id", (req, res) => {
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
router.patch("books/:id", (req, res) => {
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

router.get("students", (req, res, next) => {
  res.json(students);
});

router.get("students/:id", (req, res) => {
  //identified the specific student   :id is a variable(input a number in the browser)
  const studentid = req.params.id;
  var studentinfo = studentdetails(studentid); //calling the function studentdetails
  res.json(studentinfo);
  // res.json(`my students id is ${id}`); // browser output
  // console.log(`my book id is ${id}`); //terminal output
});
router.post("students", (req, res) => {
  var { ID, FirstName, SecondName, StudentID } = req.body;
  var student = req.body; //created a new student
  students.push(student); //adding the created student
  return res.send("Student has been succesfully added"); //output after adding the student
});
router.delete("students/:id", (req, res) => {
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
router.patch("students/:id", (req, res) => {
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

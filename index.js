var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//var students=["Tony","Lisa","Michael","Ginger","Food"];
// var cars={Brand:"Volvo",Model:"Mustang",Year:2006};
// var carbrand=cars.Year
//     console.log(carbrand)

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
    //  else
    //  {
    //    return "Student with id ${studentid} does not exist"
    //   }
  }
}

// for (student of students) {
//   //for loop iterating the student list
//   if (student["StudentID"] == parseInt(studentid)) {
//     //if loop cheching if the studentid input is true or false
//     console.log(student)
//     // return student;
//   } else {
//     return `Student with that id ${studentid} does not exist`;
//   }
// }

var bookDetails = (bookId) => {
  for (let i = 0; i < books.length; i++) {
    if (books[i]["SerialNumber"] == bookId) {
      // console.log(books[i])
      return books[i];
    }
    // else {
    //   return `Book with the id ${bookId} does not exist`
    // }
  }

  // for (book of books) {
  //   if (book["SerialNumber"] === bookId) {
  //     return book;
  //   } else {
  //     return `Book with Serial Number ${bookId} doesnt exist`;
  //   }

  // res.json(`my book id is ${bookId}`);
  // console.log(`my book id is ${bookId}`);

  // console.log("our bookId "+ bookId)
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
  const bookToDelete = books.find((x) => x.ID == id);
  if (bookToDelete) {
    const index = books.indexOf(bookToDelete);
    books.splice(index, 1);
    return res.send("Book has been successfuly been deleted");
  } else {
    return res.send(`Book with the ID ${id} does not exist`);
  }

  // for(book of books)
  //   console.log(id)
  //   return res.send(id)
  //return res.send("Book deleted successfully")
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

// app.get("/cars", (req, res, next) => {
//     res.json(cars);
//     });

//app.get("/students", (req, res, next) => {
//res.json(students);
//});
// app.get("/name", (req, res, next) => {
//     res.json(["Yvone ","njeri","Yvee"]);
//    });
//app.get("/phones" ,(req, res, next) => {
//  res.json(["Samsung ","Techno","IPhone"]);
//});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

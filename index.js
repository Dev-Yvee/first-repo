var express = require("express");
var app = express();
//var students=["Tony","Lisa","Michael","Ginger","Food"];
// var cars={Brand:"Volvo",Model:"Mustang",Year:2006};
// var carbrand=cars.Year
//     console.log(carbrand)

var student = [
  { ID: 1, FirstName: "Yvone", SecondName: "Njeri", StudentID: 8391 },
  { ID: 2, FirstName: "Benson", SecondName: "Gathu", StudentID: 8392 },
  { ID: 3, FirstName: "Aburili", SecondName: "Anami", StudentID: 8393 },
];

var books = [
  { ID: 10, Title: "Tommorrow People", SerialNumber: 100 },
  { ID: 11, Title: "River and the source", SerialNumber: 200 },
  { ID: 12, Title: "River Between", SerialNumber: 300 },
];

var bookDetails = function (bookId) {
  for (book of books) {
    if (book["ID"] === parseInt(bookId)) {
      return book;
    }else{
        return `Book with ID ${bookId} doesnt exist`
    }
  }
 
  // res.json(`my book id is ${bookId}`);
  // console.log(`my book id is ${bookId}`);

  // console.log("our bookId "+ bookId)
};

app.get("/books", (req, res, next) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
 var bookInfo =  bookDetails(bookId);
  res.json(bookInfo);
});

app.get("/students", (req, res, next) => {
  res.json(student);
});

app.get("/students/:id", (req, res) => {
  //identified the specific student   :id is a variable(input a)
  const id = req.params.id;
  res.json(`my students id is ${id}`); // browser output
  console.log(`my book id is ${id}`); //terminal output
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

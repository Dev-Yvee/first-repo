const express = require("express");
const booksModel = require("../models/booksModel");
const studentsModel = require("../models/studentsModel");


const router = express.Router();

module.exports = router;

//api to add books
router.post("/books", async (req, res) => {
  const data = new booksModel({
    Title: req.body.Title,
    Author: req.body.Author,
    SerialNumber: req.body.SerialNumber,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message }); //400 CLIENT ERROR
  }
});

//api to return all books
router.get("/books", async (req, res) => {
  try {
    const data = await booksModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//api to get book by serial number
router.get("/books/:sn", async (req, res) => {
  //checks the specific book id
  const booksn = req.params.sn;
  try {
    const data = await booksModel.find({ SerialNumber: booksn });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//api to delete book
router.delete("/books/:sn", async (req, res) => {
  const sn = req.params.sn;
  try {
    await booksModel.deleteOne({ SerialNumber: sn });
    res.json(`Books ${sn} has been deleted`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//api to update book(put)
router.put("/books/:sn", (req, res) => {
  const sn = req.params.sn;
  res.json(sn);
});

//api for updating books(patch)
router.patch("/books/:sn", async (req, res) => {
  const sn = req.params.sn;
  try {
    const data = await booksModel.updateOne(
      { SerialNumber: sn },
      { $set: { Author: req.body.Author, Title: req.body.Title } }
    );
    res.json(`Book ${sn} has been updated`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/students",async (req, res) => {
  const data = new studentsModel({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Age: req.body.Age,
    RegistrationNumber:req.body.RegistrationNumber
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(500).json({ message: error.message }); //400 CLIENT ERROR
  }
  
});

//api to get all students
router.get("/students",async (req, res, next) => {
  try {
    const data = await studentsModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//api to get student by id
router.get("/students/:rn",async (req, res) => {
  const studentsrn = req.params.rn;
 try {
  const data= await studentsModel.find({RegistrationNumber:studentsrn})
  res.json(data)
} catch (error) {
  res.status(400).json({ message: error.message });
} });

router.delete("/students/:rn",async (req, res) => {
  const rn = req.params.rn;
  try {
    const data=await studentsModel.deleteOne({RegistrationNumber:rn})
    res.json(`Student with registration number ${rn} has been deleted`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
 
});
router.patch("/students/:rn", async(req, res) => {
  const rn = req.params.rn 
  try {
    const data = await studentsModel.updateOne(
      { RegistrationNumber: rn },
      { $set: { FirstName: req.body.FirstName, RegistrationNumber: req.body.RegistrationNumber } }
    );
    res.json(`Student with registration ${rn} has been updated`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

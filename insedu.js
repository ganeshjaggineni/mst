const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Connect to the MongoDB database
async function connectToDatabase() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/gani", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("DB Connected");
    } catch (error) {
      console.error("DB Not Connected - Error:", error);
    }
  }

  connectToDatabase();
  const student = new mongoose.Schema({
    student_regNo: String,
    student_dob:String,
    student_branch:String,
    student_name:String,
    student_email:String,
    student_gender:String,
    student_mobile:Number
  });

  const nm = new mongoose.model("student", student);


app.use(bodyParser.urlencoded({ extended: false }));
app.post('/insedu', async (req, res) => {
    try {
      const studregno = req.body.sturegno; // Assuming "sturegno" is the name of the input field in your HTML form
      const studdateString = req.body.stujoindate;
      const studbranch = req.body.branch;
      const studname = req.body.stuname;
      const studemail = req.body.stuemail;
      const studgender = req.body.stugender;
      const studmobile = parseFloat(req.body.stumobile);


      // Split the date string into year, month, and day components
      const dateComponents = studdateString.split('-');
      if (dateComponents.length !== 3) {
        throw new Error("Invalid date format");
      }

      const year = parseInt(dateComponents[0], 10);
      const month = parseInt(dateComponents[1], 10) - 1; // Months are 0-based in JavaScript (0 - January, 1 - February, ...)
      const day = parseInt(dateComponents[2], 10);

      // Create a Date object with the parsed components
      const studdate = new Date(year, month, day);

      const data = new nm({ student_regNo: studregno, student_dob: studdate ,student_branch:studbranch,student_name:studname,student_email:studemail,student_gender:studgender,student_mobile:studmobile});
      await data.save();
      res.send('<h1><p>Student register number: ' + studregno + '</h1>' + '<h1><p>Student join date: ' + studdate.toDateString()+'<h1><p>Studnet branch: ' + studbranch+'<h1><p>Student name: ' + studname+'<h1><p>Student email: ' + studemail+'<h1><p>Student gender: ' + studgender+'<h1><p>Student Mobile Number: ' + studmobile);
    } catch (error) {
      console.error("Error saving data to MongoDB:", error);
      res.status(500).send("An error occurred while saving data to MongoDB");
    }
  });




// app.post('/insedu', async (req, res) => {
//   try {
//     const fname = req.body.sturegno; // Assuming "sturegno" is the name of the input field in your HTML form
//     const studdate = req.body.stujoindate;
//     const data = new nm({ name: fname ,date:studdate});
//     await data.save();
//     res.send('<h1><p>Username: ' + fname +'</h1>+' +'<h1><p>Stu join date:'+studdate);
//   } catch (error) {
//     console.error("Error saving data to MongoDB:", error);
//     res.status(500).send("An error occurred while saving data to MongoDB");
//   }
// });

console.log('Listening on port 8000...');
const server = app.listen(8000);






































































// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));

// let fname = "";

// app.post('/insedu', (req, res) => {
//   fname = req.body.sturegno; // Assuming "sturegno" is the name of the input field in your HTML form
//   res.send('<h1><p>Username: ' + fname);
// });

// async function connectToDatabase() {
//     try {
//       await mongoose.connect("mongodb://127.0.0.1:27017/gani", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       });
//       console.log("DB Connected");
//     } catch (error) {
//       console.error("DB Not Connected - Error:", error);
//     }
//   }

//   connectToDatabase();

//   const ns=new mongoose.Schema({
//     name:String,
// });
// const nm=new mongoose.model("records",ns);
//     const data=new nm({name:fname});
//     data.save();

// console.log('Listening on port 8000...');
// const server = app.listen(8000);

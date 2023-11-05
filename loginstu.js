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

    // Access the "students" collection
    const db = mongoose.connection;
    const collection = db.collection('students');

    // Middleware for parsing URL-encoded form data
    app.use(bodyParser.urlencoded({ extended: false }));


    app.post('/loginstu', async (req, res) => {
        try {
          // Access data from the request body
          const username = req.body.user;
          const password = req.body.pwd;

          // Use the `findOne` method on the collection with projection
          const data = await collection.findOne(
            { "student_regNo": username },
            { "studnt_mobile":password } // Projection to include student_regNo and pwd fields
          );

          if (data) {
            const student_regNo = data.student_regNo;
            const storedPassword = data.student_email;

            if (student_regNo === username && storedPassword === password) {
             const styledMessage = '<div style="font-size: 24px; color: blue;">Login successful</div>';

        // Retrieve additional data about the user from the database
        const additionalUserData = {
          // Example fields to retrieve from the database
        sturegno: data.student_regNo,
          stuemail: data.student_email,
          stuname:data.student_name,
          stubranch: data.student_branch,
          studdob:data.student_dob,
          stugender:data.student_gender,
          stumobile:data.student_mobile,
        };

        // Style the entire response
        const styledResponse = `
          <div style="font-family: Arial, sans-serif; background-color: #f0f0f0;">
            ${styledMessage}
            <div style="font-size: 18px; color: green; padding: 10px;">
              Additional Data:<br>
              STUDENT REGISTRATION NO: ${additionalUserData.sturegno}<br>
              STUDENT NAME: ${additionalUserData.stuname}<br>
              STUDENT EMAIL: ${additionalUserData.stuemail}<br>
              STUDENT DOB: ${additionalUserData.studdob}<br>
              STUDENT BRANCH: ${additionalUserData.stubranch}<br>
              STUDENT GENDER: ${additionalUserData.stugender}<br>
              STUDENT MOBILE NO: ${additionalUserData.stumobile}
            </div>
          </div>
        `;

        res.status(200).send(styledResponse);

            } else {

              const styledMessage = '<div style="font-size: 24px; color: blue;">INVALID CREDENTIALS</div>';
            res.status(200).send(styledMessage);
            }
          } else {
            // No data found
            const styledMessage = '<div style="font-size: 24px; color: blue;">INVALID CREDENTIALS</div>';
            res.status(200).send(styledMessage);
          }
        } catch (error) {
          // Handle any errors that occur during processing
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });


    // app.post('/loginstu', async (req, res) => {
    //   try {
    //     // Access data from the request body
    //     const username = req.body.user;
    //     const pwd = req.body.pwd;

    //     // Use the `findOne` method on the collection
    //     const data = await collection.findOne(
    //         { "student_regNo": username },
    //         { _id: 0, student_regNo: 1 } // Projection to include only student_regNo field
    //       );

    //     if (data) {
    //       // Data found, send it in the response
    //       const student_regNo = data.student_regNo;
    //       if(student_regNo == username)
    //       {
    //     //   res.status(200).json({ message: 'Data received and processed successfully', data });
    //       res.status(200).json({ message: 'student registration number', student_regNo });
    //       }

    //     } else {
    //       // No data found
    //       res.status(404).json({ error: 'Data not found' });
    //     }
    //   } catch (error) {
    //     // Handle any errors that occur during processing
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal server error' });
    //   }
    // });

    // Start the Express server
    const port = 8000; // Replace with your desired port
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error("DB Not Connected - Error:", error);
  }
}

// Call the connectToDatabase function to establish the connection
connectToDatabase();

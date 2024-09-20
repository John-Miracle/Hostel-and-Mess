    // Import required modules
    const express = require("express");
    const dotenv = require("dotenv")
    dotenv.config()
    const bodyParser = require("body-parser");
    const mongoose = require("mongoose");

    // Initialize Express app
    const app = express();

    // Middleware
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));

    // MongoDB Connection
    // mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true });
    // const db = mongoose.connection;

    const mongoURI = process.env.DB_URL;
    mongoose.connect(mongoURI);
    const db = mongoose.connection;


    // const mongoURI = "mongodb+srv://anuj3126:Cf2e0b0@cluster0.2bgavby.mongodb.net/Database?retryWrites=true&w=majority"
    // Check MongoDB connection status
    db.on('error', () => console.log("Error in Connecting to Database"));
    db.once('open', () => console.log("Connected to Database")); 

    // Define Schema
    const dataSchema = new mongoose.Schema({
        index: Number,
        name: String,
        data: {
            beds: Number,
            photo: String
        }
    });

    const hostelData = mongoose.model('Hostel', dataSchema);

    // GET method to fetch data by index
    app.get("/hostelData", (req, res) => {
        const index = parseInt(req.query.index); // Extract index from the query parameter
        hostelData.findOne({ index })
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).send("Data not found");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error fetching data from MongoDB");
        });
    });

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

    // // POST method to insert data into MongoDB
    // app.post("/hostelData", (req, res) => {
    //     const { index, name, data } = req.body;
    //     const newData = new hostelData({ index, name, data });
    //     newData.save((err, result) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).send("Error inserting data into MongoDB");
    //         } else {
    //             res.status(200).send("Data inserted successfully");
    //         }
    //     });
    // });

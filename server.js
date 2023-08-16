const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const verifyToken = require("./app/middlewares/authJwt");

const AdmingetRoute = require("./app/routes/adminget.route");
const DoctorgetRoute = require("./app/routes/doctorget.route");
const ModgetRoute = require("./app/routes/mod.route");
const InpatientRoutes = require("./app/routes/inpatientRoutes");
const OutpatientRoutes = require("./app/routes/outpatientRoute");
const FullBloodCountRoutes = require("./app/routes/fullBloodCountRoutes");
const SerumRoutes = require("./app/routes/serumRoutes");
const ImagingRoutes = require("./app/routes/imagingRoutes");
const DrugDispensingRoutes = require("./app/routes/drugDispensingRoutes");
const DrugTypesRoutes = require("./app/routes/drugTypesRoutes");
const patientRoutes = require("./app/routes/patientRoutes");
const clinicalHistoryRoutes = require("./app/routes/cinicalHistory.routes");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "test-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

const db = require("./app/models");
const { compareSync } = require("bcryptjs");
const Role = db.role;


MONGODB_URI = `mongodb+srv://ranulucd:UcdDBranul@cdw1.6qjuvsb.mongodb.net/aes-256-cbc_db?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI).then(
  () => {
    console.log("Database connected ");
  },
  (err) => {
    console.log("Database not connected : " + err);
  }
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to medical application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "doctor",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'doctor' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.use("/admin", verifyToken.verifyToken, verifyToken.isAdmin, AdmingetRoute);
app.use("/doc", verifyToken.verifyToken, verifyToken.isDoctor, DoctorgetRoute);
app.use("/mod", verifyToken.verifyToken, verifyToken.isModerator, ModgetRoute);

app.use("/patients", verifyToken.verifyToken, patientRoutes);
app.use("/clinicalhistories", verifyToken.verifyToken, clinicalHistoryRoutes);
app.use("/in-patients", verifyToken.verifyToken, InpatientRoutes);
app.use("/out-patients", verifyToken.verifyToken, OutpatientRoutes);
app.use("/fbc", verifyToken.verifyToken, FullBloodCountRoutes);
app.use("/serum", verifyToken.verifyToken, SerumRoutes);
app.use("/img", verifyToken.verifyToken, ImagingRoutes);
app.use("/drug", verifyToken.verifyToken, DrugDispensingRoutes);
app.use("/drug-type", verifyToken.verifyToken, DrugTypesRoutes);

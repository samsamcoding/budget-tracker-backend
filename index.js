const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// const corsOptions = {
//   origin: "https://budget-tracker-sooty.vercel.app/",
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.options("*", cors());

mongoose.connection.once("open", () =>
  console.log("Now connected to MongoDB Atlas.")
);
mongoose.connect(
  "mongodb+srv://samuelDelaCruz:JEny9UrTwUQWwKlG@zuitt-bootcamp.iyx27.mongodb.net/budget_tracking_app?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user");

app.use("/api/users", userRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listen to port ${port}`);
});
// app.listen(process.env.PORT || 4000, () => {
//     console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
// })

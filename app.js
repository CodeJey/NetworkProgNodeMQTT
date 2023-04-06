const express = require("express");
const app = express();
//приложението е достъпно на адрес localhost:3000, но ако се отвори порт би могло да се използва и отвън
//за да се видят съответните страници е необходимо да се направи заявка контролерите да направят render на view-тата
const port = 3000;

// статични файлове
app.use(express.static("public"));
app.use("/assets", express.static("public"));

// шаблони/views
app.set("view engine", "ejs");

// настройка на json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const subscriberRouter = require("./routes/subscriber");
const publisherRouter = require("./routes/publisher");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/subscriber", subscriberRouter);
app.use("/publisher", publisherRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
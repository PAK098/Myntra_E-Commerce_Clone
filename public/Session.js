/*localStorage.setItem("name", "coderdost");
localStorage.setItem("date", "Oct9,2024 ,8:02 PM");
const value = localStorage.getItem("name");
console.log(value);
// localStorage.clear()       //clears all local storage
//localStorage.removeItem("name");       //clears specific local storage
///Session Storage
sessionStorage.setItem("name", "coderdost");
sessionStorage.setItem("date", "Oct9,2024 ,8:02 PM");
const value1 = sessionStorage.getItem("name");
// sessionStorage.clear()
//sessionStorage.removeItem("name");
console.log(value);

//Cookie
const session = require("express-sessoin");
server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  })
);
server.get("/", (req, res) => {
  req.session.test ? req.session.test++ : (req.session.test = 1);
  res.send(req.session.test.toString());
});
*/

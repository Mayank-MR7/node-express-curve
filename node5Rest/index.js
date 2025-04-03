const express = require("express");
const users = require("./MOCK_DATA (1).json");

const app = express();
const PORT = 3000;

//Routes

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json("pending");
  })
  .delete((req, res) => {
    return res.json("pending");
  });

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  return res.json("Pending");
});

app.patch("/api/users/:id", (req, res) => {
  return res.json("pending");
});

app.delete("/api/users/:id", (req, res) => {
  return res.json("pending");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

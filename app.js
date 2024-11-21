const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

PORT = 8080;

// object containing pet types and their general requirements
const petRequirements = {
  Amphibian_Reptile: {
    size: "3",
    space: "2",
    interaction: "2",
    cost: "4",
    matchValue: 2.75, // matchValue is the average of the 4 properties in order to find a good match
  },
  Bird: { size: "2", space: "5", interaction: "4", cost: "5", matchValue: 4 },
  Cat: { size: "5", space: "7", interaction: "7", cost: "5", matchValue: 6 },
  Dog: {
    size: "6",
    space: "7",
    interaction: "10",
    cost: "6",
    matchValue: 7.25,
  },
  Fish: { size: "1", space: "5", interaction: "1", cost: "5", matchValue: 3 },
  Horse: {
    size: "10",
    space: "10",
    interaction: "6",
    cost: "10",
    matchValue: 9,
  },
  Rabbit: {
    size: "4",
    space: "6",
    interaction: "6",
    cost: "6",
    matchValue: 5.5,
  },
};

// compares the average of the user's inputted values to the matchValue of each pet type and recommends the one with the closest value
function petTypeRecommender(size, space, inter, cost) {
  const matchVal =
    (Number(size) + Number(space) + Number(inter) + Number(cost)) / 4; // the value used to determine a match
  let petMatch = ["", 999]; // placeholder for closest matching pet type, [<pet type name>, <match difference>]

  for (const key of Object.keys(petRequirements)) {
    let curr = petRequirements[key].matchValue;
    let diff = Math.abs(matchVal - curr);
    if (diff < petMatch[1]) {
      petMatch = [key, diff];
    }
  }

  return petMatch[0];
}

function sortMatches(matches) {
  matches.sort((a, b) => a[1] - b[1]);
}

function petTypeRecommenderMultiple(size, space, inter, cost) {
  const matchVal =
    (Number(size) + Number(space) + Number(inter) + Number(cost)) / 4; // the value used to determine a match
  let petMatches = []; // placeholder for closest matching pet type, [<pet type name>, <match difference>]

  for (const key of Object.keys(petRequirements)) {
    let curr = petRequirements[key].matchValue;
    let diff = Math.abs(matchVal - curr);
    petMatches.push([key, diff]);
  }

  sortMatches(petMatches);

  return petMatches.slice(0, 3);
}

// receive request containing pet preferences and return a pet type recommendation
// using a POST request since GET requests usually don't have a body
app.post("/pet-type-recommendation", (req, res) => {
  const { size, space, interaction, cost } = req.body;

  if (
    !size ||
    !space ||
    !interaction ||
    !cost ||
    Number(size) <= 0 ||
    Number(size) > 10 ||
    Number(space) <= 0 ||
    Number(space) > 10 ||
    Number(interaction) <= 0 ||
    Number(interaction) > 10 ||
    Number(cost) <= 0 ||
    Number(cost) > 10
  ) {
    return res.status(400).send({ message: "Invalid input data" });
  }

  const recommendation = petTypeRecommender(size, space, interaction, cost);

  res.send({ Answer: recommendation });
});

app.post("/pet-type-recommendation-multiple", (req, res) => {
  const { size, space, interaction, cost } = req.body;

  if (
    !size ||
    !space ||
    !interaction ||
    !cost ||
    Number(size) <= 0 ||
    Number(size) > 10 ||
    Number(space) <= 0 ||
    Number(space) > 10 ||
    Number(interaction) <= 0 ||
    Number(interaction) > 10 ||
    Number(cost) <= 0 ||
    Number(cost) > 10
  ) {
    return res.status(400).send({ message: "Invalid input data" });
  }

  const recommendation = petTypeRecommenderMultiple(
    size,
    space,
    interaction,
    cost
  );

  res.send({
    Answer: {
      Best: recommendation[0][0],
      Great: recommendation[1][0],
      Good: recommendation[2][0],
    },
  });
});

app.listen(PORT, () => {
  console.log(
    `Service listening on http://localhost:${PORT}; Press Ctrl+C to exit.`
  );
});

module.exports = app;

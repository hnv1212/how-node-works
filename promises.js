const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Could not find that file 😥");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😥");
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    // console.log(res.body.message);

    // await writeFilePromise("dog-img.txt", res.body.message);
    // console.log("Random dog image save to file! 😀");

    // Waiting for Multiple Promises Simultaneously
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    console.log(all);
    const imgs = all.map(el => el.body.message);
    await writeFilePromise('dog-img.txt', imgs.join('\n'));
    console.log("Random dog image save to file! 😀");
  } catch (error) {
    console.log(error);
    throw error;
  }
  return "2: READY 🐶";
};

(async () => {
  try {
    console.log("1: Will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics.");
  } catch (error) {
    console.log("ERROR 💥");
  }
})();

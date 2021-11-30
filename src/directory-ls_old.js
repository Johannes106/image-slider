//way of old school
//1. read all files of directory
//2. get all names of each of this array without any manipulation
//3. extract the timestamp of the name and add extend the element with the information
//4. write object to a file
const fs = require("fs");

//1. read all filles of directory
function readFiles(folder = "../public/", extension = /\.png/) {
  const dirTree = require("directory-tree");
  const filteredTree = dirTree(folder, { extensions: extension });
  return filteredTree;
}

//2. get all names of each of this array
function objectsWithTimestamp(obj) {
  let fileName;
  let regexTimestamp = "[0-9]{10}";
  let counter = 0;
  obj.children.forEach((ele) => {
    fileName = ele.name;
    let timestamp;
    if (fileName && fileName.match(regexTimestamp)) {
      timestamp = fileName.match(regexTimestamp);
    } else {
      const index = obj.children.indexOf(ele);
      if (index > -1) {
        obj.children.splice(index, 1);
      }
    }
    counter++;
  });
  return obj.children;
}
let arrayWithObjects = objectsWithTimestamp(readFiles());

//3. extract the timestamp of the name and add extend the element with the information
function addDataToObject(arr) {
  let rawTimestamp;
  let fileName;
  let regexTimestamp = "[0-9]{10}";
  let dateOfTimestamp;
  let counterId = 1;
  arr.forEach((obj) => {
    fileName = obj.name;
    if (fileName && fileName.match(regexTimestamp)) {
      rawTimestamp = fileName.match(regexTimestamp)[0];
      // * 1000 because regular timestamp of unix is in seconds and javascript need it in milliseconds
      dateOfTimestamp = new Date(rawTimestamp * 1000).toLocaleDateString(
        "de-DE"
      );
    }
    Object.assign(obj, { id: counterId });
    Object.assign(obj, { timestamp: rawTimestamp });
    Object.assign(obj, { date: dateOfTimestamp });
    counterId++;
  });
  return arr;
}
const manipulatedObject = addDataToObject(arrayWithObjects);

//4. write object to a file
function writeIntoFile(object) {
  let data = JSON.stringify(object);
  // data = data.replace("[", "");
  // data = data.replace("]", "");
  fs.writeFileSync("sma_graphics.json", data);
}
writeIntoFile(manipulatedObject);

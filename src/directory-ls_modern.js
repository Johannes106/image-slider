//way of modern js
//1. read all files of directory
//2. get all names of each of this array without any manipulation
//3. extract the timestamp of the name and add extend the element with the information
//4. write object to a file
const fs = require("fs");

//1. read all files of directory
const readedFiles = (folder = "../public/", extension = /\.png/) => {
  const dirTree = require("directory-tree");
  const filteredTree = dirTree(folder, { extensions: extension });
  return filteredTree;
};
const rawFiles = readedFiles().children;

//2. get all names of each of this array
const filteredFiles = rawFiles.filter((item) => {
  return item.path.match("[0-9]{10}");
});
const rawFilteredFiles = filteredFiles;

//3. extract the timestamp of the name and add extend the element with the information
let id = 1;
const manipulatedObject = rawFilteredFiles.map((obj) => ({
  id: id++,
  ...obj,
  datum: (obj.path = new Date(
    obj.path.match("[0-9]{10}") * 1000
  )).toLocaleDateString("de-DE"),
}));

//4. write object to a file
const writtenObjToFile = (obj) => {
  let fileName = "sma_graphics.json";
  fs.writeFileSync(fileName, JSON.stringify(obj));
  console.log(`written JSON to ${fileName}`);
};

exports.createJsonDependingOnFiles = function () {
  writtenObjToFile(manipulatedObject);
};

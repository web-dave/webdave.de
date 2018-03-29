const directory = "./src/assets/posts/";
const fs = require("fs");

const posts = fs.readdirSync(directory);
posts.sort((a, b) => {
  return (
    fs.statSync(directory + a).mtime.getTime() -
    fs.statSync(directory + b).mtime.getTime()
  );
});

const arr = JSON.stringify(posts.filter(name => name.indexOf(".md") !== -1));
const jsonContent = `
{
  "posts": ${arr}
}
`;

fs.writeFile(`${directory}posts.json`, jsonContent, function(err) {
  if (err) {
    return console.log(err);
  }
});

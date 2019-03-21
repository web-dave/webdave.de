const directory = './src/assets/posts/';
const fs = require('fs');
const postsArray = [];
let processed = 0;

const posts = fs.readdirSync(directory);
let popstCount = posts.filter(name => name.indexOf('.md') !== -1).length;
posts.sort((a, b) => {
  return (
    fs.statSync(directory + a).mtime.getTime() -
    fs.statSync(directory + b).mtime.getTime()
  );
});

posts.forEach(p => {
  console.log(fs.statSync(directory + p).mtime.getTime());
});

posts
  .filter(name => name.indexOf('.md') !== -1)
  .forEach(post => {
    let postObj = {
      url: '',
      name: '',
      title: '',
      preview: ''
    };
    postObj.url = `assets/posts/${post}`;
    postObj.name = post.replace('.md', '');

    fs.readFile(`${directory}${post}`, 'utf8', function(err, postcontent) {
      processed++;
      if (err) {
        return console.log(err);
      }
      let preview = postcontent.substr(0, 200);

      posts[popstCount - 1];

      postObj.preview = postcontent.substr(0, 200);
      let title = postcontent
        .substr(0, postcontent.indexOf('</strong>'))
        .replace('<strong>', '');
      postObj.title = title;
      postsArray.push(postObj);
      if (popstCount === processed) {
        writeJson(postsArray);
      }
    });
  });

writeJson = postsarr => {
  const arr = JSON.stringify(postsarr);
  const jsonContent = `{"posts": ${arr}}`;

  fs.writeFile(`${directory}posts.json`, jsonContent, function(err) {
    if (err) {
      return console.log(err);
    }
  });
};

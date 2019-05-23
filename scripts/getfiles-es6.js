const fs = require('fs');

class GetPosts {
  constructor(dir, prefix, target) {
    this.processed = 0;
    this.postCount = 0;
    this.posts = [];
    this.directory = dir;
    this.pathPrefix = prefix;
    this.postsArray = [];
    this.src = target;
  }

  getFiles() {
    this.posts = fs
      .readdirSync(this.directory)
      .filter(name => name.indexOf('.md') !== -1)
      .sort((a, b) => {
        return (
          fs.statSync(this.directory + a).mtime.getTime() -
          fs.statSync(this.directory + b).mtime.getTime()
        );
      });
    this.postCount = this.posts.length;
  }

  writeJson(arr) {
    const str = JSON.stringify(this.postsArray);
    const jsonContent = `export const postsArray =  ${str}`;
    fs.writeFile(this.src, jsonContent, err => {
      if (err) {
        return console.log(err);
      }
    });
  }

  /**
   *
   * @param {boolean} save only for testing purpos.
   */
  processPosts(save) {
    this.posts.forEach(post => {
      let postObj = {
        url: '',
        name: '',
        title: '',
        preview: '',
        timestamp: ''
      };
      postObj.url = `${this.pathPrefix}${post}`;
      postObj.name = post.replace('.md', '');
      postObj.timestamp = fs.statSync(this.directory + post).mtime.getTime();
      fs.readFile(`${this.directory}${post}`, 'utf8', (err, postcontent) => {
        this.processed++;
        if (err) {
          return console.log(err);
        }

        postObj.preview = postcontent.substr(0, 200);
        let title = postcontent
          .substr(0, postcontent.indexOf('</strong>'))
          .replace('<strong>', '');
        postObj.title = title;
        this.postsArray.push(postObj);
        if (this.postCount === this.processed && save) {
          this.writeJson(this.postsArray);
        }
      });
    });
  }
}

const dir = './src/assets/posts/';
const prefix = 'assets/posts/';
const src = './src/app/blog/dashboard/posts.ts';

const postlist = new GetPosts(dir, prefix, src);
postlist.getFiles();
postlist.processPosts(true);

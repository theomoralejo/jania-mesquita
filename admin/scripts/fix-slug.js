const fs = require('fs');
const path = require('path');

function findFiles(dir, match) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file, match));
    } else {
      if (file.endsWith(match)) results.push(file);
    }
  });
  return results;
}

const files = findFiles(path.join(__dirname, '../src/pages'), 'Create.tsx');

const robustSlugify = `const slugify = (text = "") =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\\u0300-\\u036f]/g, "")
      .replace(/\\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Match anything from "const slugify = " until the first empty line or return statement
  // Using a powerful regex
  content = content.replace(/const slugify.*?\.replace\(\/\^-\|-\$\/g, ""\);/s, robustSlugify);
  content = content.replace(/const slugify \= \(text \= ''\) \=>[\s\S]*?const slugify \= \(text \= ""\) \=>[\s\S]*?\.replace\(\/\^-\|-\$\/g, ""\);/s, robustSlugify);
  content = content.replace(/const slugify.*?\.replace\(\/\^-\|const slugify[\s\S]*?\.replace\(\/\^-\|-\$\/g, ""\);/s, robustSlugify);
  
  fs.writeFileSync(file, content);
});
console.log("Fixed slugify in " + files.length + " files");

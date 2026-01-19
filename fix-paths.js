const fs = require("fs");
const path = require("path");

// Fix paths in index.html
const indexPath = path.join(__dirname, "dist", "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Replace absolute paths with paths relative to /CarEvent
html = html.replace(/href="\/favicon.ico"/g, 'href="/CarEvent/favicon.ico"');
html = html.replace(/src="\/_expo\//g, 'src="/CarEvent/_expo/');
html = html.replace(/href="\/_expo\//g, 'href="/CarEvent/_expo/');

// Write the modified HTML back
fs.writeFileSync(indexPath, html);
console.log("Fixed paths in index.html");

// Fix paths in JavaScript bundles
const jsDir = path.join(__dirname, "dist", "_expo", "static", "js", "web");
const jsFiles = fs.readdirSync(jsDir).filter((file) => file.endsWith(".js"));

jsFiles.forEach((jsFile) => {
  const jsPath = path.join(jsDir, jsFile);
  let jsContent = fs.readFileSync(jsPath, "utf8");

  // Fix asset paths in JS bundle - replace /assets/ with /CarEvent/assets/
  jsContent = jsContent.replace(/"\/assets\//g, '"/CarEvent/assets/');

  // Write the modified JS back
  fs.writeFileSync(jsPath, jsContent);
  console.log(`Fixed asset paths in ${jsFile}`);
});

console.log("All paths fixed for GitHub Pages deployment");

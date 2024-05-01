#!/usr/bin/env node
import fs from "fs";
import path from "path";

function createComponent(componentName) {
  const dirPath = path.join(process.cwd(), "components", componentName);
  const files = [
    {
      name: `${componentName}.template`,
      content: `<div id=${getSelector(componentName)}>${componentName} works!</div>`,
    },
    {
      name: `${componentName}.css`,
      content: `:host { display: block; padding: 16px; border: 1px solid #ccc; }`,
    },
    {
      name: `${componentName}.js`,
      content: `import Component from '../Component.js';
export default class ${toCamelCase(componentName)} extends Component {
    constructor(shadowRoot, name) {
        super(shadowRoot, name);
    }
}`,
    },
  ];

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  files.forEach((file) => {
    fs.writeFileSync(path.join(dirPath, file.name), file.content);
  });

  console.log(`Component ${componentName} has been created.`);
}

function toCamelCase(str) {
  return str.split("-").map(capitalize).join("");
}

function getSelector(str) {
  return str.split("-")[0] + "-container";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const componentName = process.argv[2];
if (!componentName) {
  console.error("Please specify the component name");
  process.exit(1);
}

createComponent(componentName);

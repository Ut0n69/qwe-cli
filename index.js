#!/usr/bin/env node

const inquirer = require("inquirer");
const co = require('co');
const prompt = require('co-prompt');
const exec = require("child_process").exec;
const loading = require('loading-cli');

const templateArray = [
  "Node.js APP WIth TypeScript",
  "Vuex With Firebase",
  "Vuex With Express",
  "Web API With TypeScript",
  "Web API With JavaScript",
  "Static Web",
];
let appsName;

const clone = (name, template) => {
  try {
    const load = loading("Cloning...").start();

    exec(`git clone https://github.com/Ut0n69/${template}.git`, err => {
      if (err) {
        console.log("git clone")
        throw err;
      }
    });

    setTimeout(() => {
      exec(`mv ${template}/ ${name}`, err => {
        if (err) {
          throw err;
        }
      });
    }, 5000);

    setTimeout(() => {
      load.text = ' Install...';
      exec('yarn', {
        cwd: `./${name}`
      }, err => {
        if (err) {
          throw err;
        }
        load.stop();
        console.log("");
        console.log("Done!");
        console.log(`
        next
          +-+-+-+-+-+-+-+-+-+-+-+
          |  $ cd ${name}/
          |  RUN YOUR SCRIPTS
          +-+-+-+-+-+-+-+-+-+-+-+
        `);
        console.log("");
        process.exit(1);
      })
    }, 8000);
  } catch (e) {
    console.log(e)
  }
};

co(function* () {
  appsName = yield prompt("\u001b[36m" + "What's Your Apps Name: " + "\u001b[0m");
  process.stdin.pause();

  inquirer.prompt([{
    type: "list",
    name: "size",
    message: "Pick a preset",
    choices: templateArray,
  }]).then(ans => {
    switch (ans.size) {
      case templateArray[0]:
        clone(appsName, "nodejs-typescript-starter");
        break;
      case templateArray[1]:
        clone(appsName, "vuex-firebase-sample");
        break;
      case templateArray[2]:
        clone(appsName, "vuex-express-sample");
        break;
      case templateArray[3]:
        clone(appsName, "express-typescript");
        break;
      case templateArray[4]:
        clone(appsName, "web-api-express-mysql");
        break;
      case templateArray[5]:
        clone(appsName, "static-web-template");
        break;
    }
  });
});
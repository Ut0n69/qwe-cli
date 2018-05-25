#!/usr/bin/env node

const exec = require("child_process").exec
const program = require("commander")
const _cliProgress = require('cli-progress');

const command = process.argv[2]
const dirName = process.argv[3]

const version = "1.0.1"

const bar1 = new _cliProgress.Bar({}, _cliProgress.Presets.shades_classic)
let time = 0

if (command == "init") {
  console.log("\u001b[36m" + "Installing..." + "\u001b[0m")

  bar1.start(100, time);
  let progressBar = setInterval(() => {
    time = time + 1
    if (time == 99) {
      clearInterval(progressBar)
    } else {
      bar1.update(time);
    }
  }, 1000)
  exec('git clone https://github.com/Ut0n69/spa-template-with-vuejs.git', (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    }
  })

  setTimeout(() => {
    exec(`mv spa-template-with-vuejs/ ${dirName}`, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      }
    })
  }, 3000)

  setTimeout(() => {
    exec('npm install', {
      cwd: `./${dirName}`
    }, (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      }
      bar1.update(100);
      bar1.stop();
      console.log("Done!")
      console.log(`
      next
      +-+-+-+-+-+-+-+-+-+-+-+
      |  $ cd ${dirName}/
      |  $ qwe build
      +-+-+-+-+-+-+-+-+-+-+-+
      `)
      console.log("")
      process.exit(1)
    })
  }, 5000)
} else if (command == "build") {
  if (dirName == "-p") {
    console.log("\u001b[36m" + "Building for production environment" + "\u001b[0m")
    exec("npm run production", (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      }
      console.log("Build passing!")
      console.log("")
    })
  } else {
    console.log("\u001b[36m" + "Building..." + "\u001b[0m")
    exec("npm run build", (err, stdout, stderr) => {
      if (err) {
        console.log(err)
      }
      console.log("Build passing!")
      console.log(`
      next
      +-+-+-+-+-+-+-+-+-+-+-+
      |  $ qwe serve
      +-+-+-+-+-+-+-+-+-+-+-+
      `)
      console.log("")
    })
  }
} else if (command == "serve") {
  console.log("\u001b[36m" + "Serving...")
  console.log("command + c, If you wanna stop it." + "\u001b[0m")
  exec("npm start", (err, stdout, stderr) => {
    setTimeout(() => {
      console.log(stdout)
    }, 1000)
    if (err) {
      console.log(err)
    }
  })
} else if (command == "-h" || command == "--help") {
  console.log(`
  Usage:

  Initialize: qwe init YOUR_APP_NAME

  build: qwe build
  
  production build: qwe build -p

  serve: qwe serve


  Options:

  -v, --version    output the version number
  -h, --help       output usage information

  `)
} else if (command == "-v" || command == "--version") {
  console.log(version)
} else {
  console.log("You might be wrong.")
  console.log(`
    This app can use only these commands.

    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |  $ qwe init YOUR_APP_NAME
    |  $ qwe build
    |  $ qwe serve
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    `)
}

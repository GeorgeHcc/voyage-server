const { log } = require("console");
const gradient = require("gradient-string");
const chalk = require("chalk");
const figlet = require("figlet");
class System {
  constructor() {}
  static vice(str, options) {
    const len = str.length;
    const fill = options ? (options.fill ? options.fill : "-") : "-";
    log(gradient.vice(`${fill.repeat(len)} \n${str} \n${fill.repeat(len)}`));
  }
  static warn(str) {
    log( chalk.bgYellow(" WARN "), chalk.yellow(str));
  }
  static error(str) {
    log( chalk.bgRed(" ERROR "), chalk.red(str));
  } 
  static success(str) {
    log( chalk.bgGreen(" SUCCESS "), chalk.green(str));
  }
  static log(str) {
    log( chalk.bgGray(" INFO "), chalk.gray(str));
  }
  static logo(str) {
    figlet.text(
      str, 
      {
        font: "Standard",
      },
      (error, data) => {
        if (error) {
          console.error(error);
          return;
        }
        const coloredLogo = gradient.pastel.multiline(data);
        log(coloredLogo);
      }
    );
  }
} 
module.exports = System;

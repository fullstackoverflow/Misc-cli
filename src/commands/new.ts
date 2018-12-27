import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import { statSync, readdirSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { sync } from "rimraf";
import { join } from "path";
import { execSync } from "child_process";

export default class NewProject extends Command {
  static description = "create new project with misc";

  static examples = [`$ misc new ./`];

  static flags = {
    help: flags.help({ char: "h" }),
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "path" }];

  async run() {
    const { args, flags } = this.parse(NewProject);
    const { path } = args;
    if (path) {
      if (!flags.force) {
        if (existsSync(path) && statSync(path).isDirectory()) {
          if (readdirSync(path).length > 0) {
            const cover = await cli.prompt("Directory is not empty,cover or not(Y/N)?");
            if (cover === "N") {
              return;
            } else if (cover === "Y") {
              sync(path);
              mkdirSync(path);
            }
          }
        } else {
          mkdirSync(path);
        }
      } else {
        sync(path);
        mkdirSync(path);
      }
      const projectName = await cli.prompt("What is the project name?");
      execSync("git clone https://github.com/fullstackoverflow/Misc-exmaple.git .", { cwd: path, stdio: "inherit" });
      sync(join(path, ".git"));
      const pkg = JSON.parse(readFileSync(join(path, "package.json")).toString());
      pkg.name = projectName;
      writeFileSync(join(path, "package.json"), JSON.stringify(pkg, null, 4));
      execSync("npm i", { cwd: path, stdio: "inherit" });
      this.log(`project ${projectName} create success`);
    }
  }
}

import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import { statSync, readdirSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { sync } from "rimraf";
import { join, resolve } from "path";
import { execSync } from "child_process";
import * as Listr from "listr";
import * as execa from "execa";

function Task(path, projectName) {
  return new Listr([
    {
      title: "Download from git repository",
      task: () =>
        execa.stdout("git", ["clone", "https://github.com/fullstackoverflow/Misc-exmaple.git", path]).then(result => {
          if (result !== "") {
            throw new Error("Download error");
          }
          sync(join(path, ".git"));
          const pkg = JSON.parse(readFileSync(join(path, "package.json")).toString());
          pkg.name = projectName;
          writeFileSync(join(path, "package.json"), JSON.stringify(pkg, null, 4));
        })
    },
    {
      title: "Install package dependencies with npm",
      task: () => execa("npm", ["install"], { cwd: path })
    }
  ]);
}

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
    let { path } = args;
    if (path) {
      if (!flags.force) {
        if (existsSync(path) && statSync(path).isDirectory()) {
          if (readdirSync(path).length > 0) {
            const cover = await cli.prompt("Directory is not empty,cover or not(Y/N)?");
            if (cover === "N") {
              return;
            } else if (cover === "Y") {
              sync("{*,.*}", {
                glob: {
                  cwd: path
                }
              });
            }
          }
        }
      } else {
        sync("{*,.*}", {
          glob: {
            cwd: path
          }
        });
      }
      const projectName = await cli.prompt("What is the project name?");
      await Task(path, projectName).run();
      this.log(`project ${projectName} create success`);
    }
  }
}

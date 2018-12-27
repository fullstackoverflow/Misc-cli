misc
====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/misc.svg)](https://npmjs.org/package/misc)
[![Downloads/week](https://img.shields.io/npm/dw/misc.svg)](https://npmjs.org/package/misc)
[![License](https://img.shields.io/npm/l/misc.svg)](https://github.com/fullstackoverflow/Misc-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @tosee/misc-cli
$ misc COMMAND
running command...
$ misc (-v|--version|version)
@tosee/misc-cli/1.0.1 win32-x64 node-v8.11.4
$ misc --help [COMMAND]
USAGE
  $ misc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`misc help [COMMAND]`](#misc-help-command)
* [`misc new [PATH]`](#misc-new-path)

## `misc help [COMMAND]`

display help for misc

```
USAGE
  $ misc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src\commands\help.ts)_

## `misc new [PATH]`

create new project with misc

```
USAGE
  $ misc new [PATH]

OPTIONS
  -f, --force
  -h, --help   show CLI help

EXAMPLE
  $ misc new ./
```

_See code: [src\commands\new.ts](https://github.com/fullstackoverflow/misc-cli/blob/v1.0.1/src\commands\new.ts)_
<!-- commandsstop -->

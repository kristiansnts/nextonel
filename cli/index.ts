import { Command } from "commander"
import { initCommand } from "./commands/init"
import packageJson from "../package.json"

const program = new Command()

program
  .name("shadpanel")
  .description("Admin Panel Toolkit for Next.js with shadcn/ui")
  .version(packageJson.version)

program
  .command("init")
  .description("Initialize a new ShadPanel project")
  .argument("[project-name]", "Project directory name")
  .action(initCommand)

program.parse()

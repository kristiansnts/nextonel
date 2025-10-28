import { Command } from "commander"
import { initCommand } from "./commands/init"
import packageJson from "../package.json"

const program = new Command()

program
  .name("create-shadpanel-next")
  .description("Create a new Next.js admin panel with ShadPanel")
  .version(packageJson.version)
  .argument("[project-name]", "Project directory name (required)")
  .action(async (projectName?: string) => {
    // When used as `npx create-shadpanel-next my-app`, projectName is the first arg
    await initCommand(projectName)
  })

// Also support the init subcommand for backward compatibility
program
  .command("init")
  .description("Initialize a new ShadPanel project")
  .argument("[project-name]", "Project directory name")
  .action(initCommand)

program.parse()

import chalk from "chalk"
import ora, { Ora } from "ora"

export const logger = {
  // Info messages
  info: (message: string) => {
    console.log(chalk.blue("ℹ"), message)
  },

  // Success messages
  success: (message: string) => {
    console.log(chalk.green("✔"), message)
  },

  // Warning messages
  warn: (message: string) => {
    console.log(chalk.yellow("⚠"), message)
  },

  // Error messages
  error: (message: string) => {
    console.log(chalk.red("✖"), message)
  },

  // Create a spinner
  spinner: (text: string): Ora => {
    return ora({
      text,
      spinner: "dots",
    })
  },

  // Print welcome banner
  welcome: () => {
    console.log()
    console.log(
      chalk.bold.cyan("┌─────────────────────────────────────────────────┐")
    )
    console.log(
      chalk.bold.cyan("│                                                 │")
    )
    console.log(
      chalk.bold.cyan("│   Welcome to ShadPanel CLI                      │")
    )
    console.log(
      chalk.bold.cyan("│   Admin Panels Built on shadcn/ui               │")
    )
    console.log(
      chalk.bold.cyan("│                                                 │")
    )
    console.log(
      chalk.bold.cyan("└─────────────────────────────────────────────────┘")
    )
    console.log()
  },

  // Print completion message
  complete: (projectName: string, packageManager: string, installationType?: string, isCurrentDir?: boolean) => {
    console.log()

    // Different message based on installation type
    if (installationType === "full-panel") {
      console.log(chalk.green.bold("✨ Done! Your ShadPanel admin panel is ready."))
    } else if (installationType === "auth-components") {
      console.log(chalk.green.bold("✨ Done! Authentication and components are installed."))
    } else if (installationType === "components-only") {
      console.log(chalk.green.bold("✨ Done! ShadPanel components are installed."))
    } else {
      console.log(chalk.green.bold("✨ Done! Your ShadPanel project is ready."))
    }

    console.log()
    console.log(chalk.bold("🚀 Get started:"))

    // Only show "cd" if not current directory
    if (!isCurrentDir) {
      console.log(chalk.cyan(`  cd ${projectName}`))
    }

    if (installationType === "full-panel") {
      console.log(chalk.cyan(`  ${packageManager}`))
      console.log(chalk.cyan(`  Open .env and configure your environment variables`))
      console.log(chalk.cyan(`  ${packageManager === "npm run dev" ? "npm run dev" : packageManager.replace("npm", "").trim() + " dev"}`))
    } else {
      console.log(chalk.cyan(`  ${packageManager}`))
      console.log(chalk.cyan(`  Import components: import { Form, DataTable } from "shadpanel"`))
    }

    console.log()
    console.log(chalk.bold("📚 Documentation:"), chalk.cyan("https://shadpanel.dev/docs"))
    console.log(chalk.bold("🌟 Star us:"), chalk.cyan("https://github.com/kristiansnts/shadpanel"))
    console.log()
  },

  // Print a blank line
  newline: () => {
    console.log()
  },
}

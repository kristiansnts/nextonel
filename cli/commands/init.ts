import path from "path"
import fs from "fs-extra"
import { promptInitQuestions, promptAppName } from "../utils/prompts"
import { logger } from "../utils/logger"
import {
  copyBaseTemplate,
  copyAuthTemplate,
  copyDemoTemplate,
  copyConfigTemplate,
  createEnvFile,
  mergeMenuConfigs,
  type TemplateVariables,
} from "../utils/files"
import {
  isPackageManagerAvailable,
  installDependencies,
  updatePackageJson,
  getDevCommand,
  type PackageManager,
} from "../utils/dependencies"
import { initGitRepository, isGitAvailable } from "../utils/git"
import packageJson from "../../package.json"

export async function initCommand(projectName?: string): Promise<void> {
  logger.welcome()

  // Prompt user for project configuration
  const answers = await promptInitQuestions(projectName)

  if (!answers) {
    logger.error("Initialization cancelled")
    process.exit(1)
  }

  // Validate package manager
  if (!isPackageManagerAvailable(answers.packageManager)) {
    logger.error(
      `Package manager "${answers.packageManager}" is not available on your system`
    )
    process.exit(1)
  }

  // Get application name
  const appName = await promptAppName()

  // Setup paths
  // Handle current directory (.) for components-only and auth-components
  const targetDir = answers.projectName === "."
    ? process.cwd()
    : path.resolve(process.cwd(), answers.projectName)
  // When built, __dirname is dist/, so we go up one level to find templates/
  const templatesDir = path.resolve(__dirname, "../templates")

  // Check if templates directory exists
  if (!(await fs.pathExists(templatesDir))) {
    logger.error("Templates directory not found. This may be a package issue.")
    process.exit(1)
  }

  logger.info(`Setting up your project in: ${targetDir}`)
  logger.newline()

  // Create template variables
  const variables: TemplateVariables = {
    APP_NAME: appName,
    PROJECT_NAME: answers.projectName,
    SHADPANEL_VERSION: packageJson.version,
    GOOGLE: answers.authProviders.includes("google"),
    GITHUB: answers.authProviders.includes("github"),
    CREDENTIALS: answers.authProviders.includes("credentials"),
  }

  try {
    // Step 1: Create project directory
    const spinner1 = logger.spinner("Creating project structure...")
    spinner1.start()
    await fs.ensureDir(targetDir)
    spinner1.succeed("Project structure created")

    // Step 2: Copy base template (only for full-panel)
    if (answers.installationType === "full-panel") {
      const spinner2 = logger.spinner("Copying base template files...")
      spinner2.start()
      await copyBaseTemplate(templatesDir, targetDir, variables)
      spinner2.succeed("Base template files copied")
    }

    // Step 3: Copy config files
    const spinner3 = logger.spinner("Setting up configuration...")
    spinner3.start()
    await copyConfigTemplate(templatesDir, targetDir, variables)
    spinner3.succeed("Configuration files created")

    // Step 4: Copy auth template if needed
    if (answers.authentication) {
      const spinner4 = logger.spinner("Adding authentication system...")
      spinner4.start()
      await copyAuthTemplate(templatesDir, targetDir, variables)
      spinner4.succeed("Authentication system added")
    }

    // Step 5: Copy demo template if needed (only for full-panel)
    if (answers.installationType === "full-panel" && answers.demos) {
      const spinner5 = logger.spinner("Adding demo pages...")
      spinner5.start()
      await copyDemoTemplate(templatesDir, targetDir, variables)
      await mergeMenuConfigs(targetDir, true)
      spinner5.succeed("Demo pages added")
    }

    // Step 6: Create .env file
    const spinner6 = logger.spinner("Creating environment file...")
    spinner6.start()
    await createEnvFile(targetDir)
    spinner6.succeed("Environment file created")

    // Get path to local tarball for development/testing
    // When built, __dirname is dist/, so we go up one level to find the tarball
    const localTarball = path.resolve(__dirname, "../shadpanel-0.1.0.tgz")

    // Step 7: Update package.json with conditional dependencies
    const spinner7 = logger.spinner("Updating dependencies...")
    spinner7.start()
    await updatePackageJson(targetDir, {
      authentication: answers.authentication,
      shadpanelVersion: packageJson.version,
      localTarballPath: localTarball,
    })
    spinner7.succeed("Dependencies updated")

    // Step 8: Install dependencies
    const spinner8 = logger.spinner(
      `Installing dependencies with ${answers.packageManager}...`
    )
    spinner8.start()
    await installDependencies(targetDir, answers.packageManager)
    spinner8.succeed("Dependencies installed")

    // Step 9: Initialize git repository
    if (answers.initGit && isGitAvailable()) {
      const spinner9 = logger.spinner("Initializing git repository...")
      spinner9.start()
      try {
        await initGitRepository(targetDir)
        spinner9.succeed("Git repository initialized")
      } catch (error) {
        spinner9.warn("Failed to initialize git repository")
      }
    }

    // Success!
    // For current directory installation, don't show "cd ." in completion message
    const projectNameForMessage = answers.projectName === "."
      ? path.basename(process.cwd())
      : answers.projectName
    logger.complete(
      projectNameForMessage,
      getDevCommand(answers.packageManager),
      answers.installationType,
      answers.projectName === "." // Flag to indicate current directory installation
    )

    // Additional info
    if (answers.authentication) {
      logger.info(
        "Don't forget to set up your authentication providers in .env"
      )
    }

    if (answers.customTheme) {
      logger.info("You can customize your theme in app/globals.css")
    }
  } catch (error) {
    logger.error("Failed to initialize project")
    console.error(error)
    process.exit(1)
  }
}

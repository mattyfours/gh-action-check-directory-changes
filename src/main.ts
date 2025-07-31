import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const githubToken = process.env.GITHUB_TOKEN
    const prNumber = core.getInput('prNumber')
    const directories = core.getInput('directories')

    console.log(githubToken, prNumber, directories)

    // core.setOutput('branchThemeId')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

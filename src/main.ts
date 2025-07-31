import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const input: string = core.getInput('input', {
      required: true,
      trimWhitespace: true
    })

    const githubToken = core.getInput('github_token', { required: true })
    const prNumber = parseInt(core.getInput('pr_number', { required: true }))

    console.log(githubToken, prNumber)

    // core.setOutput('branchThemeId')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

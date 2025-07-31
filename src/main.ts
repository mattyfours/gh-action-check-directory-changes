import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const githubToken = process.env.GITHUB_TOKEN

    const directories = core.getInput('directories', {
      required: true,
      trimWhitespace: true
    })
    const prNumberString = core.getInput('pr-number', {
      trimWhitespace: true
    })

    const prNumber = prNumberString ? Number(prNumberString) : null

    console.log(githubToken, prNumber, directories)

    core.setOutput('has-changed', false)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

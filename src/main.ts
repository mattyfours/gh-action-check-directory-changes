import * as core from '@actions/core'
import * as github from '@actions/github'
import { Octokit } from 'octokit'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const githubToken = process.env.GITHUB_TOKEN
    const octokit = new Octokit({ auth: githubToken })

    const directories = core.getInput('directories', {
      required: true,
      trimWhitespace: true
    })
    const prNumber = Number(
      core.getInput('pr-number', {
        required: true,
        trimWhitespace: true
      })
    )

    const { owner, repo } = github.context.repo

    const files = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber
    })

    console.log(`Checking directories: ${directories}`)
    console.log(
      `Changed files:`,
      files.data.map((f) => f.filename)
    )

    console.log(githubToken, prNumber, directories)

    core.setOutput('has-changed', false)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

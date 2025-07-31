import * as core from '@actions/core'
import * as github from '@actions/github'
import { Octokit } from 'octokit'
import { matchPattern } from './uitils.js'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const { owner, repo } = github.context.repo
    const githubToken = process.env.GITHUB_TOKEN
    const octokit = new Octokit({ auth: githubToken })

    const filesToCheck = core
      .getInput('files', {
        required: true,
        trimWhitespace: true
      })
      .split(',')
      .map((fileToCheck) => fileToCheck.trim())

    const prNumber = Number(
      core.getInput('pr-number', {
        required: true,
        trimWhitespace: true
      })
    )

    const updatedPrFiles = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber
    })

    const updatedPrFilenames = updatedPrFiles.data.map((file) => file.filename)

    console.log(updatedPrFilenames)
    console.log(`Checking files: ${filesToCheck}`)
    const hasChanged = filesToCheck.some((checkFilePattern) => {
      return updatedPrFilenames.some((prFile) =>
        matchPattern(prFile, checkFilePattern)
      )
    })

    console.log(
      `PR ${hasChanged ? 'has' : 'has not'} changed files: ${filesToCheck}`
    )
    core.setOutput('has-changed', hasChanged)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

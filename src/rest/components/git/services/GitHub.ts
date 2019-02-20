import { bind } from 'decko'

import { HttpService } from '@services/helper/http'
import { GitOrganization } from '../_child/organization/model'
import { GitRepository } from '../_child/repository/model'

/**
 * Communication between Aionic and GitHub developer API
 *
 * https://developer.github.com/
 */

export class GitHubService extends HttpService {
  public constructor() {
    super({
      baseURL: 'https://api.github.com'
    })
  }

  /**
   * Get an organization
   *
   * @param {string} organization
   * @returns {Promise<Array<object>>}
   */
  @bind
  public async getOrganization(organization: string): Promise<GitOrganization> {
    try {
      const res = await this.fetchData(`orgs/${organization}`)
      const data = res.data

      const org: GitOrganization = new GitOrganization()

      org.name = data.login
      org.description = data.description
      org.url = data.url
      org.avatarUrl = data.avatar_url
      org.reposUrl = data.repos_url
      org.htmlUrl = data.html_url

      return org
    } catch (err) {
      if (err.response.status === 404) {
        throw new Error('Organization not found!')
      } else {
        throw new Error('Failed to fetch data from GitHub!')
      }
    }
  }

  /**
   * Get repositories from an organization
   *
   * @param {string} organization
   * @returns {Promise<Array<object>>}
   */
  @bind
  public async getOrganizationRepos(organization: GitOrganization): Promise<GitRepository[]> {
    try {
      const res = await this.fetchData(`orgs/${organization.name}/repos`)
      const data = res.data

      const repos: GitRepository[] = []
      for (const repo of data) {
        const newRepo: GitRepository = new GitRepository()
        newRepo.name = repo.name
        newRepo.url = repo.url
        newRepo.organization = organization
        repos.push(newRepo)
      }

      return repos
    } catch (err) {
      throw err
    }
  }

  /**
   * Get commits from an branch
   *
   * @param {string} branch
   * @returns {Promise<Array<object>>}
   */
  @bind
  public async getBranchCommits(branch: string): Promise<object[]> {
    return new Array()
  }
}

// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from "../node_modules/danger/distribution/dsl/DangerDSL"
declare var danger: DangerDSLType
export declare function message(message: string): void
export declare function warn(message: string): void
export declare function fail(message: string): void
export declare function markdown(message: string): void

export const defaultMessage = "Please rebase to get rid of the merge commits in this PR"

/**
 * No messy history, linear history
 */
export default function linearHistory(softFail = false) {
  const commits = danger.github.commits

  const hasMessyHistory = commits.some((commit) => commit.parents.length > 1)

  if (!hasMessyHistory) {
    return
  }

  if (softFail) {
    warn(defaultMessage)
  } else {
    fail(defaultMessage)
  }
}

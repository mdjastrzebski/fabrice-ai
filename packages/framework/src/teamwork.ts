import { iterate, nextTick } from './supervisor/nextTick.js'
import { Workflow, WorkflowState, workflowState } from './workflow.js'

/**
 * Teamwork runs given workflow and continues iterating over the workflow until it finishes.
 */
export async function teamwork(
  workflow: Workflow,
  state: WorkflowState = workflowState(workflow)
): Promise<WorkflowState> {
  if (state.status === 'finished') {
    return state
  }
  return teamwork(workflow, await iterate(workflow, state))
}

/**
 * Iterate performs single iteration over workflow and returns its next state
 */
export { nextTick as iterate }

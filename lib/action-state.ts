export interface ActionResult {
  status: "idle" | "success" | "error"
  message?: string
  data?: unknown
}

export const initialActionState: ActionResult = { status: "idle" }

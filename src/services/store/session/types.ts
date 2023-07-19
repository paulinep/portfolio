export interface ISessionState {
  user: any,
  token: string
  wait: boolean,
  exists: boolean,
}
export interface SessionStateConfig {
  tokenHeader: string
}


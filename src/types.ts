export interface BackgroundInfos {
  file: string,
  location: string,
  author: string,
  link: string,
}

export interface NewShareState {
  link: string,
  expiration: string,
  burn: boolean,
}

export interface ShareCreationRequest {
  encrypted: string,
  vector: string,
  salt: string,
  with_password: boolean,
  validity: string,
  burn: boolean,
}

export interface ShareCreationResponse {
  id: string,
  /** Unix timestamp in seconds */
  expirated_at: number,
  error?: string,
}

export interface ShareData {
  encrypted: string,
  vector: string,
  salt: string,
  with_password: boolean,
  /** Unix timestamp in seconds */
  expirated_at: number,
  burn: boolean,
}

export interface BackgroundInfos {
  file: string,
  location: string,
  author: string,
  link: string,
}

export interface MessageCreationRequest {
  encrypted: string,
  vector: string,
  salt: string,
  with_password: boolean,
  validity: string,
  burn: boolean,
}

export interface MessageCreationResponse {
  id: string,
  expirated_at: number,
  error?: string,
}

export interface MessageData {
  encrypted: string,
  vector: string,
  salt: string,
  with_password: boolean,
  /** Unix timestamp, (seconds) */
  expirated_at: number,
  burn: boolean,
}

export interface MessageDecrypted {
  content: string,
  /** Unix timestamp (seconds) */
  expiration: number,
  burn: boolean,
}

export interface NewMessageState {
  link: string,
  expiration: string,
  burn: boolean,
}

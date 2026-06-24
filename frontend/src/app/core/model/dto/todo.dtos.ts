export interface createToDoDTO {
  title: string;
  description: string;
}

export interface updateToDoDTO {
  title: string;
  description?: string;
}

export interface responseToDoDTO {
  id: string;
  title: string;
  description: string;
}

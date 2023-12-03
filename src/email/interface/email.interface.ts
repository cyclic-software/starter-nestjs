export interface Email {
  from?: string;
  to?: string;
  subject?: string;
  [key: string]: any;
}

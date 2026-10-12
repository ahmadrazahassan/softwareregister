export interface FormState {
  ok: boolean;
  message: string | null;
  /** Field level errors keyed by input name. */
  errors?: Record<string, string>;
}

export const initialFormState: FormState = { ok: false, message: null };

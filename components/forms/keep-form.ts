import { startTransition, type FormEvent } from "react";

/**
 * React 19 clears an uncontrolled form as soon as its action finishes, so a
 * reader who misses one field loses everything they typed. Sending the form by
 * hand leaves the inputs as they are: errors appear beside them and a success
 * replaces the form. The form keeps its `action` prop, so it still submits
 * without JavaScript.
 */
export function keepForm(action: (payload: FormData) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const data = new FormData(event.currentTarget, submitter);
    startTransition(() => action(data));
  };
}

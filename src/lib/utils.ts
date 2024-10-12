import { FormState } from "./common.types";

export async function submitFunk(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const res = await fetch("/api/auth", {
    method: "POST",
    body: formData,
  });

  return await res.json();
}

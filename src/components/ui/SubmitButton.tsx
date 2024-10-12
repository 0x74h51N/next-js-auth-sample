import { Loader, ChevronRight } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button aria-disabled={pending} type="submit" className="button mt-20">
      {pending ? (
        <>
          Submitting...
          <Loader className="ml-2" size={18} />
        </>
      ) : (
        <>
          {text}
          <ChevronRight className="ml-2" size={18} />
        </>
      )}
    </button>
  );
}

export default SubmitButton;

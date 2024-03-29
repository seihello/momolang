"use client";

import { Button } from "@/components/ui/button";
import { useCompletion } from "ai/react";
import { useEffect, useState } from "react";

export default function Completion() {
  const [word, setWord] = useState("");

  const { completion, handleSubmit, handleInputChange, input } = useCompletion({
    api: "/api/completion",
    body: {
      messages: [
        {
          role: "user",
          content: `Make three sentences using the word '${word}'.`,
        },
      ],
    },
  });

  useEffect(() => {
    setWord(input);
  }, [input]);

  useEffect(() => {
    setWord(input);
  }, [input]);

  return (
    <div className="p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <textarea className="w-64 border" onChange={handleInputChange} />
        <p>{completion}</p>
        <Button type="submit">Generate</Button>
      </form>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useCompletion } from "ai/react";
import { useEffect, useState } from "react";

export default function Completion() {
  const [word, setWord] = useState("");
  const [generatedSentences, setGeneratedSentences] = useState<string[]>([]);

  const { completion, handleSubmit, handleInputChange, input } = useCompletion({
    api: "/api/completion",
    body: {
      messages: [
        {
          role: "user",
          content: `Please provide several sentences using the word "${word}." If the word has multiple meanings, please create sentences for each meaning. After each sentence, include the Japanese meaning of the whole sentence separated by spaces. Separate each pair of sentences with "|" symbol. e.g.) The apple fell to the ground due to the force of gravity. りんごは重力の力で地面に落ちた。 | The astronaut experienced zero gravity in outer space. 宇宙飛行士は宇宙で無重力を経験した。 | The seriousness of the situation added a sense of gravity to the conversation. 状況の深刻さが会話に重みを持たせた。`,
        },
      ],
    },
  });

  useEffect(() => {
    setWord(input);
  }, [input]);

  useEffect(() => {
    const generatedSentences = completion.split(" | ");
    setGeneratedSentences(generatedSentences);
  }, [completion]);

  return (
    <div className="p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <textarea className="w-64 border" onChange={handleInputChange} />
        <div className="flex flex-col gap-y-2">
          {generatedSentences.map((generatedSentence, index) => (
            <p key={index}>{generatedSentence}</p>
          ))}
        </div>
        <Button type="submit">Generate</Button>
      </form>
    </div>
  );
}

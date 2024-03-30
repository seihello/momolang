"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCompletion } from "ai/react";
import { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";

export default function Completion() {
  const [word, setWord] = useState("");
  const [generatedSentences, setGeneratedSentences] = useState<string[]>([]);

  const { completion, handleSubmit, handleInputChange, input, isLoading } =
    useCompletion({
      api: "/api/completion",
      body: {
        messages: [
          {
            role: "user",
            content: getPrompt(word, true),
          },
        ],
      },
    });

  useEffect(() => {
    setWord(input);
  }, [input]);

  useEffect(() => {
    const generatedSentences = completion.split("|");
    setGeneratedSentences(generatedSentences);
  }, [completion]);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-y-8 p-4">
      <form
        className="flex w-full max-w-[480px] items-center gap-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          setGeneratedSentences([]);
          handleSubmit(e);
        }}
      >
        <Input
          type="text"
          className="flex-1 border"
          placeholder="Type a word..."
          onChange={handleInputChange}
        />
        <Button type="submit" className="w-24" disabled={isLoading}>
          {isLoading ? (
            <>
              <RingLoader
                color="white"
                size={24}
                // className="![&_span]:opacity-100"
              />
              <style>
                {`
                  span {
                    opacity: 0.8 !important;
                  }
                `}
              </style>
            </>
          ) : (
            <span>Generate</span>
          )}
        </Button>
      </form>

      <div className="flex min-h-32 max-w-[1080px] flex-col items-start gap-y-2">
        {generatedSentences.map((generatedSentence, index) => {
          const generatedSentencePair = generatedSentence.split("/");
          return (
            <p key={index}>
              {generatedSentencePair.map(
                (generatedSentencePairElement, index) => (
                  <span key={index}>
                    {index !== 0 && " "}
                    {generatedSentencePairElement}
                  </span>
                ),
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}

function getPrompt(word: string, includesMeaning: boolean) {
  return `Please provide several sentences using the word "${word}." If the word has multiple meanings or parts, please create sentences for each of them. The number of sentences can vary depending on variety of the word.  After each sentence, include the Japanese meaning of the whole sentence separated by /. Separate each of the pairs by |. Don't include number in the top of the sentences. e.g.) The apple fell to the ground due to the force of gravity./りんごは重力の力で地面に落ちた。|The astronaut experienced zero gravity in outer space./宇宙飛行士は宇宙で無重力を経験した。|The seriousness of the situation added a sense of gravity to the conversation./状況の深刻さが会話に重みを持たせた。`;
}

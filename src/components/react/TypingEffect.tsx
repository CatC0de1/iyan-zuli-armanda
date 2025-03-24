import React from "react";
import TypeIt from "typeit-react";

interface TypingProps {
  texts: string[];
}

const Typing: React.FC<TypingProps> = ({ texts }) => {
  return (
    <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
      <TypeIt
        options={{ loop: true }}
        getBeforeInit={(instance) => {
          texts.forEach((text) => {
            instance.type(text).pause(1500).delete(text.length).pause(500);
          });
          return instance;
        }}
      />
    </h2>
  );
};

export default Typing;

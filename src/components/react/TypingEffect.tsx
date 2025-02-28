import React from "react";
import TypeIt from "typeit-react";
import '../../styles/style.css'; 

interface TypingProps {
  texts: string[];
}

const Typing: React.FC<TypingProps> = ({ texts }) => {
  return (
    <p className="typing">
      <TypeIt
        options={{ loop: true }}
        getBeforeInit={(instance) => {
          {texts.map((text, index) => (
            instance.type(text).pause(1500).delete(text.length).pause(500)
          ))}
          // instance.type("Frontend Developer").pause(1500).delete(18).pause(500).type("Backend Developer").pause(1500).delete(17).pause(500).type("Fullstack Developer").pause(1500).delete(19);
          return instance;
        }}
      />
    </p>
  );
};

export default Typing;

import React from "react";
import TypeIt from "typeit-react";

const Typing: React.FC = () => {
  return (
    <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
      {/* <TypeIt
        options={{
          strings: ['Informatic Engineering'],
          speed: 100,
          waitUntilVisible: true,
        }}
      /> */}
      <TypeIt
        options={{ loop: true }}
        getBeforeInit={(instance) => {
          instance.type("Frontend Developer").pause(1500).delete(18).pause(500).type("Backend Developer").pause(1500).delete(17).pause(500).type("Fullstack Developer").pause(1500).delete(19);
          return instance;
        }}
      />
    </p>
  );
};

export default Typing;

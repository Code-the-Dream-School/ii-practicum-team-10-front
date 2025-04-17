// src/components/Character.tsx
// Character.tsx

interface CharacterProps {
    src: string; // только путь вроде "/public/4.png"
    alt: string;
  }
  
  const Character: React.FC<CharacterProps> = ({ src, alt }) => {
    const imageUrl = `https://ii-practicum-team-10-back.onrender.com${src.replace("/public", "")}`;
  
    return (
      <div className="w-42 h-42 overflow-hidden border-2 border-gray-300">
        <img src={imageUrl} alt={alt} className="object-cover w-full h-full" />
      </div>
    );
  };
  
  export default Character;
  
  
// src/components/Character.tsx
// Character.tsx

interface CharacterProps {
    src: string; // только путь вроде "/public/4.png"
    alt: string;
  }
  
  const Character: React.FC<CharacterProps> = ({ src, alt }) => {
    const imageUrl = `https://ii-practicum-team-10-back.onrender.com${src.replace("/public", "")}`;
  
    return (
      <div className="w-64 h-104 overflow-hidden">
        <img src={imageUrl} alt={alt} className="object-cover w-full h-full" />
      </div>
    );
  };
  
  export default Character;
  
  

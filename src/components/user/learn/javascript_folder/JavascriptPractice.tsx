import Card from '../../shared/Card';

const JavaScriptPractice = () => {
  return (
      <div className="flex flex-col justify-center items-center pt-20 lg:flex-row lg:pt-30">
        <Card colorClass='bg-yellow-300' title='Flashcards'>Strengthen your memory with quick recall exercises. Perfect for mastering key concepts, syntax, and definitions using active recall and spaced repetition.</Card>
        <Card colorClass='bg-yellow-300' title='Quiz'>Test your understanding with conceptual and problem-solving questions. Great for identifying knowledge gaps and reinforcing theoretical concepts.</Card>
        <Card colorClass='bg-yellow-300' title='Coding Challenges'>Apply your skills with hands-on exercises. Solve algorithm problems, debug code, and build mini-projects to develop real-world coding experience.</Card>
      </div>
  );
};

export default JavaScriptPractice;

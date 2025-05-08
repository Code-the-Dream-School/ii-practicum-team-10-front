import Card from '../../shared/Card';

const ReactPractice = () => {
  return (
      <div className="flex flex-col justify-center items-center pt-20 lg:flex-row lg:pt-30">
        <Card 
          colorClass='bg-orange-400' 
          challengeTitle='Flashcards'
          route='/learn/react/flashcards'>
            Strengthen your memory with quick recall exercises. Perfect for mastering key concepts, syntax, and definitions using active recall and spaced repetition.
        </Card>
        <Card 
          colorClass='bg-orange-400' 
          challengeTitle='Quiz'>
            Test your understanding with conceptual and problem-solving questions. Great for identifying knowledge gaps and reinforcing theoretical concepts.
        </Card>
      </div>
  );
};

export default ReactPractice;

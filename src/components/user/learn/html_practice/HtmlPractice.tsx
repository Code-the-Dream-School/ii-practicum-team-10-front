import Card from '../../shared/Card';

const HtmlPractice = () => {
  return (
      <div className="flex flex-col justify-center items-center pt-20 lg:flex-row lg:pt-30">
        <Card 
          colorClass='bg-blue-400' 
          challengeTitle='Flashcards'
          route='/learn/html/flashcards'>
            Strengthen your memory with quick recall exercises. Perfect for mastering key concepts, syntax, and definitions using active recall and spaced repetition.
        </Card>
        <Card 
          colorClass='bg-blue-400' 
          challengeTitle='Quiz'>
            Test your understanding with conceptual and problem-solving questions. Great for identifying knowledge gaps and reinforcing theoretical concepts.
        </Card>
        <Card 
          colorClass='bg-blue-400' 
          challengeTitle='Coding Challenges'>
            Apply your skills with hands-on exercises. Solve algorithm problems, debug code, and build mini-projects to develop real-world coding experience.
        </Card>
      </div>
  );
};

export default HtmlPractice;

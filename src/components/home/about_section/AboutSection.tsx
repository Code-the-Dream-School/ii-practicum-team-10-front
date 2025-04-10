const AboutSection: React.FC = () => {
    return (
        <div id="about" className="flex flex-col space-y-10 items-start text-left scroll-mt-20">
            <h1 className="font-bold text-4xl sm:text-6xl lg:text-8xl">Think of us as Duolingo for coding interviews!</h1>
            <p className="text-xl sm:text-3xl lg:text-4xl">We make mastering HTML, CSS, and Javascript fun and effective through interactive challenges, 
               gamification, and smart learning techniques. From quick flashcard quizzes to real-world coding 
               tasks, we help you sharpen your skills with active recall, spaced repetition, and deliberate practice.</p>
            <a href="#" className="text-black underline text-xl sm:text-3xl lg:text-4xl">Learn more about us</a>
        </div>
    );
}

export default AboutSection;
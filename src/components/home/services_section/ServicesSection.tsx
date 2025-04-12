import study from '../../../assets/images/services_section/study.png'
import gaming from '../../../assets/images/services_section/home_gamification.png'
import tracking from '../../../assets/images/services_section/home_tracking.png'

const Services: React.FC = () => {
    return (
        <div id="services" className="flex flex-col space-y-2 scroll-mt-20 gap-6">
            <div className="flex flex-col md:flex-row items-center text-left">
                <img src={study} className="w-3/4 md:w-1/2 h-auto object-contain"></img>
                <div className="space-y-5">
                    <h2 className="font-bold text-5xl sm:text-5xl lg:text-5xl">Personalized Study Plan</h2>
                    <ul className="list-disc space-y-2">
                        <li className="text-lg sm:text-xl lg:text-2xl">Choose your programming language (HTML, CSS, Javascript, and more).</li>
                        <li className="text-lg sm:text-xl lg:text-2xl">Pick your preferred practice mode: Flashcards, Multiple-Choice Questions, or Coding Challenges.</li>
                        <li className="text-lg sm:text-xl lg:text-2xl">Train at your own pace with adaptive difficulty levels.</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center text-left gap-6">
                <img src={gaming} className="w-3/4 md:w-1/2 h-auto object-contain"></img>
                <div className="space-y-5">
                    <h2 className="font-bold text-5xl sm:text-5xl lg:text-5xl">Personalized Study Plan</h2>
                    <ul className="list-disc space-y-2">
                        <li className="text-lg sm:text-xl lg:text-2xl">Earn XP by solving challenges and answering questions correctly.</li>
                        <li className="text-lg sm:text-xl lg:text-2xl">Keep your streak alive to unlock rewards and level up faster.</li>
                        <li className="text-lg sm:text-xl lg:text-2xl">Watch your character evolve as you progress in your learning journey.</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center text-left gap-6">
                <img src={tracking} className="w-3/4 md:w-1/2 h-auto object-contain"></img>
                <div className="space-y-5">
                    <h2 className="font-bold text-5xl sm:text-5xl lg:text-5xl">Personalized Study Plan</h2>
                    <ul className="list-disc space-y-2">
                        <li className="text-lg sm:text-xl lg:text-2xl">Reinforce learning with spaced repetition and active recall.</li>
                        <li className="text-lg sm:text-xl lg:text-2xl">Track your XP, levels, and streaks in a personalized dashboard.</li>
                        <li className="text-lg sm:text-xl lg:text-2xl">Get insights into your strengths and areas for improvement.</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Services;
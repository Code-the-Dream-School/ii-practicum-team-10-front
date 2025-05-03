interface ProgressBarProps {
  topic: string;
  completed: number;
  total: number;
}


const topicColorClasses: Record<string, string> = {
  HTML: 'bg-blue-400',
  CSS: 'bg-purple-400',
  JAVASCRIPT: 'bg-yellow-300',
  REACT: 'bg-orange-400',
  NODEJS: 'bg-green-400',
};

const ProgressBar: React.FC<ProgressBarProps> = ({ topic, completed, total }) => {
  const percentage = total ? Math.round((completed / total) * 100) : 0;
  const UpperTopic = topic.toUpperCase();
  const colorClass = topicColorClasses[UpperTopic] || topicColorClasses.default;
  // const cleanedTopic = topic?.replace(/[^a-zA-Z]/g, '').toUpperCase();
  // const selectedColor = topicColorClasses[cleanedTopic] || 'bg-blue-400';
  return (
    <div className="w-full">
      <h2 className="flex justify-start text-[25px] font-bold mb-4 text-black text-center">
        {topic.toUpperCase()}
        {/* {selectedColor} */}
      </h2>

      <div className="w-full bg-[#C3C3C3] rounded-full h-6 overflow-hidden">
        <div
          className={`h-full bg-[#77B7FF] rounded-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-bold text-black text-[20px] text-center flex justify-end">
        {percentage}/100EXP
      </p>
    </div>
  );
};

export default ProgressBar;

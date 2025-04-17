import Card from '../components/user/shared/Card';

const Learn = () => {
  return (
      <div className="flex flex-col justify-center items-center pt-20 lg:flex-row lg:pt-30">
        <Card colorClass='bg-blue-400' title='HTML' route='/learn/html'>The backbone of every webpage. It structures content using elements like headings, paragraphs, and images.</Card>
        <Card colorClass='bg-purple-400' title='CSS' route='/learn/css'>The backbone of every webpage. It structures content using elements like headings, paragraphs, and images.</Card>
        <Card colorClass='bg-yellow-300' title='JavaScript' route='/learn/javascript'>The backbone of every webpage. It structures content using elements like headings, paragraphs, and images.</Card>
      </div>
  );
};

export default Learn;

import Card from '../components/user/shared/Card';

const Learn = () => {
  return (
    <div className='flex flex-col'>
      <div className="flex flex-col justify-center items-center pt-20 lg:flex-row lg:pt-30">
        <Card colorClass='bg-blue-400' title='HTML' route='/learn/html'>The backbone of every webpage. It structures content using elements like headings, paragraphs, and images.</Card>
        <Card colorClass='bg-purple-400' title='CSS' route='/learn/css'>Brings designs to life by styling HTML elements with colors, layouts, and animations.</Card>
        <Card colorClass='bg-yellow-300' title='JavaScript' route='/learn/javascript'>Adds interactivity and functionality, enabling dynamic features like form validation, animations, and real-time updates.</Card>
      </div>
      <div className="flex flex-col justify-center items-center lg:flex-row">
        <Card colorClass='bg-orange-400' title='React' route='/learn/react'>A powerful JavaScript library for building interactive user interfaces. It lets you create reusable components and efficiently update the page when data changes.</Card>
        <Card colorClass='bg-green-400' title='Node.js' route='/learn/nodejs'>A runtime environment that lets you run JavaScript on the server. It’s fast, scalable, and great for building backend services like APIs and real-time apps.








</Card>
      </div>
    </div>
  );
};

export default Learn;

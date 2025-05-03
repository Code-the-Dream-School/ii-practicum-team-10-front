// import Quiz from '../components/user/learn/quiz/Quiz'
import QuizLogic from '../components/user/learn/quiz/QuizLogic';


const QuizPage = () => {
  return (
    <div className =" flex gap =[25px] flex-col items-center min-h-screen  gap-[25px] justify-center   pb-[30px]">
      {/* <Quiz/> */}
      <QuizLogic/>
    </div>
  )
}
export default QuizPage;
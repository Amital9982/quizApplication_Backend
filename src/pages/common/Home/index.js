import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "../../../apicalls/exams";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start shadow-xl p-8">
        {exams.map((exam) => (
          <li key={exam._id} className="relative flex flex-col sm:flex-row xl:flex-col items-start">
            <div className="order-1 sm:ml-6 xl:ml-0 ">
              <h3 className="mb-1 text-slate-900 font-semibold">
                <span className="mb-1 block text-sm leading-6 text-cyan-500">
                  {exam.name}
                </span>
                <ul className="list-disc pl-5">
                  <li>Category : {exam.category}</li>
                  <li>Total Marks : {exam.totalMarks}</li>
                  <li>Passing Marks : {exam.passingMarks}</li>
                  <li>Duration : {exam.duration}</li>
                  <li>Total Marks : {exam.totalMarks}</li>


                  {/* Add more instructions as needed */}
                </ul>

              </h3>

              <div className="flex justify-end ml-[270px] mt-6">
                <button
                  className="group inline-flex items-center h-9  text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-blue-950 text-white"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </div>
            <img
              src="https://media.istockphoto.com/id/1386740242/vector/vector-bubbles-with-question-mark-question-icons-isolated-on-white.jpg?s=612x612&w=0&k=20&c=evjrckVKb_RVRcN5qV1Tz1pkSu3FvHKCGtynu8btxhA="
              alt=""
              className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
              width={1216}
              height={640}
            />
          </li>
        ))}
      </ul>
    )
  );
}

export default Home;

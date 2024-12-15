import React, { useState } from "react";
import "./styles.css";
import CreateAssessment from "./CreateAssessment";
// Dummy data for courses
const dummyCourses = ["Course 1", "Course 2", "Course 3", "Course 4"];

const AssessmentManagement = () => {
  const [assessments, setAssessments] = useState([]);
  const [newAssessment, setNewAssessment] = useState({
    name: "",
    course: "",
    questions: [{ question: "", options: ["", "", "", ""], answer: "" }],
  });

  const [showCreateAssessment, setShowCreateAssessment] = useState(false);

  // Handle changes in the form inputs for the assessment
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssessment({ ...newAssessment, [name]: value });
  };

  // Handle changes in the question text
  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...newAssessment.questions];
    updatedQuestions[index].question = e.target.value;
    setNewAssessment({ ...newAssessment, questions: updatedQuestions });
  };

  // Handle changes in the options for a question
  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...newAssessment.questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setNewAssessment({ ...newAssessment, questions: updatedQuestions });
  };

  // Handle changes in the answer for a question
  const handleAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...newAssessment.questions];
    updatedQuestions[questionIndex].answer = e.target.value;
    setNewAssessment({ ...newAssessment, questions: updatedQuestions });
  };

  // Add a new question to the assessment
  const addQuestion = () => {
    const newQuestion = { question: "", options: ["", "", "", ""], answer: "" };
    setNewAssessment({
      ...newAssessment,
      questions: [...newAssessment.questions, newQuestion],
    });
  };

  // Handle batch creation
  const handleCreateAssessment = () => {
    setAssessments([...assessments, { ...newAssessment, id: Date.now() }]);
    setShowCreateAssessment(false); // Close the modal
    setNewAssessment({
      name: "",
      course: "",
      questions: [{ question: "", options: ["", "", "", ""], answer: "" }],
    }); // Reset form
  };

  return (
    <div className="assessment-management-container">
      <div className="header">
        <button
          className="add-assessment-btn"
          onClick={() => setShowCreateAssessment(true)}
        >
          Create Assessment
        </button>
      </div>

      {/* Display Assessments in a Card View */}
      <div className="assessments-container">
        {assessments.length > 0 ? (
          assessments.map((assessment) => (
            <div className="assessment-card" key={assessment.id}>
              <h3>{assessment.name}</h3>
              <p>Course: {assessment.course}</p>
              <p>No of Questions: {assessment.questions.length}</p>
            </div>
          ))
        ) : (
          <p>No assessments available</p>
        )}
      </div>
      <CreateAssessment
        open={showCreateAssessment}
        onClose={() => setShowCreateAssessment(false)}
        courses={dummyCourses}
        newAssessment={newAssessment}
        handleSave={addQuestion}
        handleChange={handleChange}
        handleQuestionChange={handleQuestionChange}
        handleOptionChange={handleOptionChange}
        handleAnswerChange={handleAnswerChange}
      />
    </div>
  );
};

export default AssessmentManagement;

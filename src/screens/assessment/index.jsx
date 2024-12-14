import React, { useState } from 'react';
import './styles.css';
// Dummy data for courses
const dummyCourses = ['Course 1', 'Course 2', 'Course 3', 'Course 4'];

const AssessmentManagement = () => {
  const [assessments, setAssessments] = useState([]);
  const [newAssessment, setNewAssessment] = useState({
    name: '',
    course: '',
    questions: [{ question: '', options: ['', '', '', ''], answer: '' }],
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

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
    const newQuestion = { question: '', options: ['', '', '', ''], answer: '' };
    setNewAssessment({ ...newAssessment, questions: [...newAssessment.questions, newQuestion] });
  };

  // Handle batch creation
  const handleCreateAssessment = () => {
    setAssessments([...assessments, { ...newAssessment, id: Date.now() }]);
    setIsModalVisible(false); // Close the modal
    setNewAssessment({
      name: '',
      course: '',
      questions: [{ question: '', options: ['', '', '', ''], answer: '' }],
    }); // Reset form
  };

  // Open/Close modal for creating an assessment
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <div className="assessment-management-container">
      <div className="header">
        <button className="add-assessment-btn" onClick={toggleModal}>
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

      {/* Assessment Creation Modal */}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Assessment</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Assessment Name"
                value={newAssessment.name}
                onChange={handleChange}
              />
              <select
                name="course"
                value={newAssessment.course}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                {dummyCourses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {/* Questions Section */}
              <div className="questions-container">
                {newAssessment.questions.map((question, index) => (
                  <div className="question-item" key={index}>
                    <input
                      type="text"
                      placeholder="Question"
                      value={question.question}
                      onChange={(e) => handleQuestionChange(index, e)}
                    />
                    {question.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, optionIndex, e)}
                      />
                    ))}
                    <input
                      type="text"
                      placeholder="Correct Answer"
                      value={question.answer}
                      onChange={(e) => handleAnswerChange(index, e)}
                    />
                  </div>
                ))}
              </div>
              <button type="button" className="add-question-btn" onClick={addQuestion}>
                Add Question
              </button>
            </form>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleCreateAssessment}>
                Save
              </button>
              <button className="cancel-btn" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentManagement;

import Button from "../../components/Button";
import Modal from "../../components/Modal";

const CreateAssessment = ({
  open,
  onClose,
  courses,
  newAssessment,
  handleSave,
  handleChange,
  handleQuestionChange,
  handleOptionChange,
  handleAnswerChange,
}) => {
  const answers = ["1", "2", "3", "4"];
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Assessment"
      actions={
        <>
          <Button variant="outline" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="small" onClick={handleSave}>
            Save
          </Button>
        </>
      }
    >
      <form>
        <input
          type="text"
          name="name"
          placeholder="Assessment Name"
          className="w-full mb-2"
          value={newAssessment.name}
          onChange={handleChange}
        />
        <select
          name="course"
          className="w-full mb-2"
          value={newAssessment.course}
          onChange={handleChange}
        >
          <option value="">Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
        {/* Questions Section */}
        <div className="questions-container">
          {newAssessment.questions.map((question, index) => (
            <div className="flex gap-16" key={index}>
              <p>Q{index + 1}. </p>
              <div className="question-item">
                <input
                  type="text"
                  placeholder="Question"
                  className="w-full mb-2"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                />
                {question.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    className="w-full mb-2"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  />
                ))}
                <select
                  name="answer"
                  value={question.answer}
                  className="w-full mb-2"
                  onChange={(e) => handleAnswerChange(index, e)}
                >
                  <option value="">Select Correct Answer</option>
                  {answers.map((ans, index) => (
                    <option key={index} value={ans}>
                      Option {ans}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <Button variant="secondary" size="small" onClick={handleSave}>
          Add Question
        </Button>
      </form>
    </Modal>
  );
};

export default CreateAssessment;

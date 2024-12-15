import Button from "../../components/Button";
import Modal from "../../components/Modal";

const UploadAttendance = ({ open, onClose, handleUpload }) => {
  // Handle file select
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded file:", file);
      // Here, you can parse the file and update the attendance data if needed
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Upload Attendance"
      actions={
        <>
          <Button variant="outline" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="small" onClick={handleUpload}>
            Upload
          </Button>
        </>
      }
    >
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileSelect}
        className="w-full"
      />
    </Modal>
  );
};

export default UploadAttendance;

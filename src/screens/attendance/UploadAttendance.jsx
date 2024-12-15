import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const UploadAttendance = ({ open, onClose, handleUpload }) => {
  const [file, setFile] = useState();

  // Handle file select
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
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
          <Button
            variant="primary"
            size="small"
            disabled={!file}
            onClick={() => handleUpload(file)}
          >
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

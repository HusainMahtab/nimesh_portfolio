import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle, FaFileUpload, FaFileDownload } from "react-icons/fa";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    // console.log("currentuser", user);
    // Check admin access
    if (user?.role !== "ADMIN") {
      navigate("/");
    }

    // Default route
    if (location.pathname === "/adminpanel") {
      navigate("/adminpanel/all_projects");
    }

    // Set download URL if resume exists
    // if (user?.resumeUrl) {
    //     setDownloadUrl(user.resumeUrl);
    // }
  }, [user, location, navigate]);

  // const handleResumeUpload = async (e, userId) => {
  //   e.preventDefault();
  //   if (!resumeFile) {
  //     setUploadStatus("Please select a file first");
  //     return;
  //   }

  //   try {
  //     setUploadStatus("Uploading...");
  //     setUploadProgress(0);

  //     const formData = new FormData();
  //     formData.append("resumeUrl", resumeFile);

  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/api/v1/users/upload-resume/${userId}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
  //         },
  //         onUploadProgress: (progressEvent) => {
  //           const percentCompleted = Math.round(
  //             (progressEvent.loaded * 100) / progressEvent.total
  //           );
  //           setUploadProgress(percentCompleted);
  //         },
  //       }
  //     );

  //     setUploadStatus("Resume uploaded successfully!");
  //     setDownloadUrl(response.data.resumeUrl); // Update download URL

  //     setTimeout(() => {
  //       setUploadStatus("");
  //       setUploadProgress(0);
  //       setResumeFile(null);
  //     }, 3000);
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     setUploadStatus(
  //       error.response?.data?.message || "Error uploading resume"
  //     );
  //     setUploadProgress(0);
  //   }
  // };



  return (
    <div className="min-h-screen my-8 sm:flex w-full">
      {/* Sidebar */}
      <aside className="min-h-full w-full max-w-64 bg-white shadow-lg rounded-lg mx-4">
        {/* Admin Profile */}
        <div className="h-48 flex flex-col items-center justify-center p-4 border-b">
          <div className="relative text-5xl text-gray-500 cursor-pointer">
            {user?.profilePic ? (
              <img
                className="rounded-full w-24 h-24 object-cover border-2 border-gray-200"
                src={user.profilePic}
                alt={user.name}
              />
            ) : (
              <FaUserCircle className="hover:text-gray-600" />
            )}
          </div>
          <p className="capitalize text-lg font-semibold mt-2">
            {user?.userName}
          </p>
          <p className="text-sm text-slate-500">{user?.role}</p>
        </div>

        {/* Resume Section */}
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-3 flex items-center">
            <FaFileUpload className="mr-2" /> Resume Management
          </h3>
          <form
            // onSubmit={(e) => handleResumeUpload(e, user?._id)}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume (PDF/DOC)
              </label>
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100"
              >
                Choose File
              </label>
            </div>
            {resumeFile && (
              <p className="text-sm text-gray-600 truncate">
                Selected: {resumeFile.name}
              </p>
            )}
            <button
              type="submit"
              disabled={!resumeFile}
              className={`w-full py-2 rounded flex items-center justify-center ${
                !resumeFile
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Upload Resume
            </button>
          </form>
          {/* Progress and Status */}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          {uploadStatus && (
            <p
              className={`text-sm mt-2 text-center ${
                uploadStatus.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {uploadStatus}
            </p>
          )}

          {/* Download Section */}
          {downloadUrl && (
            <div className="mt-4 pt-4 border-t">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                <FaFileDownload /> Download Resume
              </a>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <Link
            to="all_projects"
            className="block py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            All Projects
          </Link>
          <Link
            to="all_users"
            className="block py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            All Users
          </Link>
          <Link
            to="all_user_messages"
            className="block py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            User Messages
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 rounded-lg p-6 mx-4 shadow-sm">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;

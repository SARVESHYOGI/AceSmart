import { useSelector } from "react-redux";
import { type RootState } from "../store";

export default function StudentProfile() {
  const userDetail = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      {userDetail ? (
        <div>
          <h2>Student Profile</h2>
          <p>
            <strong>Name:</strong> {userDetail.name}
          </p>
          <p>
            <strong>Email:</strong> {userDetail.email}
          </p>
          <p>
            <strong>Role:</strong> {userDetail.role}
          </p>
        </div>
      ) : (
        <p>No user logged in.</p>
      )}
    </div>
  );
}

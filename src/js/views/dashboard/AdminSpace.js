import { ClassesList } from "./ClassesList.js";
import { TeachersList } from "./TeachersList.js";
import { UsersList } from "./UsersList.js";
import axios from 'axios';

export const AdminSpace = async (practices, role) => {
  const teachers = await (await fetch(`${process.env.API_URL}/teachers/`)).json();
  const authToken = window.localStorage.getItem("auth-token");
  const users = await axios.get(`${process.env.API_URL}/users/all`, { headers: { "x-auth-token": authToken } });

  return `
    <h1>Admin Space</h1>
    <p>With great power comes great responsibility!</p>
    ${ClassesList(practices, role)}
    ${TeachersList(teachers)}
    ${UsersList(users)}
  `
}

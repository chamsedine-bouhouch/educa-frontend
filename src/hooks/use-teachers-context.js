import { useContext } from "react";
import TeacherContext from "../context/TeacherContext";
 
export default function UseTeachersContext() {
    return useContext(TeacherContext)
}
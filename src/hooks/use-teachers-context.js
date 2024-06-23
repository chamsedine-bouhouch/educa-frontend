import { useContext } from "react";
import TeacherContext from "../context/teachers";
 
export default function UseTeachersContext() {
    return useContext(TeacherContext)
}
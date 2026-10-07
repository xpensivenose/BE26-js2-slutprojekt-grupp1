import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "bootstrap";
import { getAllProjects } from "./services/projectService.ts";

console.log(await getAllProjects());
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, EmployeeProject, IApiResponse, Project } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';

  constructor(private http: HttpClient) { }

  createNewEmployee(obj: Employee){
    return this.http.post<Employee>(this.apiUrl + 'CreateEmployee', obj);
  }

  getAllEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>('https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees')
  }
  getParentDept(){
    return this.http.get<IApiResponse>('https://projectapi.gerasim.in/api/EmployeeManagement/GetParentDepartment');
  }

  deleteEmployeeById(id: number){
    return this.http.delete<Employee>(this.apiUrl + `DeleteEmployee/${id}`);
  }

  updateEmployee(obj: Employee){
    return this.http.put<Employee>(this.apiUrl + 'UpdateEmployee/'+ obj.employeeId, obj);
  }

  createNewProject(obj: Employee){
    return this.http.post<Project>(this.apiUrl + 'CreateProject', obj);
  }

  getprojects(){
    return this.http.get<Project[]>(this.apiUrl + 'GetAllProjects');
  }

  updateProject(obj: Project){
    return this.http.put<Project>(this.apiUrl + 'UpdateProject/'+ obj.projectId, obj);
  }

  addNewEmp(obj: EmployeeProject){
    debugger
    return this.http.post<EmployeeProject>(this.apiUrl + 'CreateProjectEmployee', obj);
  }

  getEmployeeProjects(id: number){
    return this.http.get<EmployeeProject[]>(this.apiUrl + 'GetAllProjectEmployee/' + id);
  }
  
  deleteProjectById(id: number){
    return this.http.delete<Employee>(this.apiUrl + `DeleteProject/${id}`);
  }

}

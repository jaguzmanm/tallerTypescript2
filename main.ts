import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
let studentInfoTbody: HTMLElement = document.getElementById('studentInfo')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredit: HTMLElement = document.getElementById("button-filterByCredit")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputLowBox: HTMLInputElement = <HTMLInputElement> document.getElementById("low-box")!;
const inputHighBox: HTMLInputElement = <HTMLInputElement> document.getElementById("high-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

renderStudent(dataStudent);

btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`

renderStudentInfoInTable(dataStudent);


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudent(student: Student):void{
    
  let titulo = document.createElement("h4");
  titulo.textContent= student.nombre;
  studentTbody.appendChild(titulo);

  let imagen= document.createElement("img");
  imagen.className="img-fluid max-width: 100% height: auto";
  imagen.src=student.avatar;
  imagen.alt="Avatar";
  studentTbody.appendChild(imagen);

}

function renderStudentInfoInTable(student: Student): void {

  let trElement2 = document.createElement("tr");
  trElement2.innerHTML=`<td>Código</td>
                        <td>${student.codigo}</td>`;
  studentInfoTbody.appendChild(trElement2);

  let trElement3 = document.createElement("tr");
  trElement3.innerHTML=`<td>Cédula</td>
                        <td>${student.cedula}</td>`;
  studentInfoTbody.appendChild(trElement3);

  let trElement4 = document.createElement("tr");
  trElement4.innerHTML=`<td>Edad</td>
                        <td>${student.edad} años</td>`;
  studentInfoTbody.appendChild(trElement4);

  let trElement5 = document.createElement("tr");
  trElement5.innerHTML=`<td>Dirección</td>
                        <td>${student.direccion}</td>`;
  studentInfoTbody.appendChild(trElement5);

  let trElement6 = document.createElement("tr");
  trElement6.innerHTML=`<td>Teléfono</td>
                        <td>${student.telefono}</td>`;
  studentInfoTbody.appendChild(trElement6);
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
  totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`;
}

function applyFilterByCredit() { 
  let txtLow = inputLowBox.value;
  let txtHigh = inputHighBox.value;
  let low = (txtLow == null || txtLow=='') ? -1 : parseInt(txtLow);
  let high = (txtHigh == null|| txtHigh=='') ? -1 : parseInt(txtHigh);
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredit(low, high, dataCourses);
  renderCoursesInTable(coursesFiltered);
  totalCreditElm.innerHTML = `${getTotalCredits(coursesFiltered)}`;
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredit(low: number, high:number, courses: Course[]) {
  return low == 0 && high>8? dataCourses : courses.filter( c => 
    c.credits>=low && c.credits<=high);
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}   


btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredit.onclick = () => applyFilterByCredit();
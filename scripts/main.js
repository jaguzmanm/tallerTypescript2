import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var studentInfoTbody = document.getElementById('studentInfo');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredit = document.getElementById("button-filterByCredit");
var inputSearchBox = document.getElementById("search-box");
var inputLowBox = document.getElementById("low-box");
var inputHighBox = document.getElementById("high-box");
var totalCreditElm = document.getElementById("total-credits");
renderStudent(dataStudent);
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
renderStudentInfoInTable(dataStudent);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudent(student) {
    var titulo = document.createElement("h4");
    titulo.textContent = student.nombre;
    studentTbody.appendChild(titulo);
    var imagen = document.createElement("img");
    imagen.className = "img-fluid max-width: 100% height: auto";
    imagen.src = student.avatar;
    imagen.alt = "Avatar";
    studentTbody.appendChild(imagen);
}
function renderStudentInfoInTable(student) {
    var trElement2 = document.createElement("tr");
    trElement2.innerHTML = "<td>C\u00F3digo</td>\n                        <td>" + student.codigo + "</td>";
    studentInfoTbody.appendChild(trElement2);
    var trElement3 = document.createElement("tr");
    trElement3.innerHTML = "<td>C\u00E9dula</td>\n                        <td>" + student.cedula + "</td>";
    studentInfoTbody.appendChild(trElement3);
    var trElement4 = document.createElement("tr");
    trElement4.innerHTML = "<td>Edad</td>\n                        <td>" + student.edad + " a\u00F1os</td>";
    studentInfoTbody.appendChild(trElement4);
    var trElement5 = document.createElement("tr");
    trElement5.innerHTML = "<td>Direcci\u00F3n</td>\n                        <td>" + student.direccion + "</td>";
    studentInfoTbody.appendChild(trElement5);
    var trElement6 = document.createElement("tr");
    trElement6.innerHTML = "<td>Tel\u00E9fono</td>\n                        <td>" + student.telefono + "</td>";
    studentInfoTbody.appendChild(trElement6);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function applyFilterByCredit() {
    var txtLow = inputLowBox.value;
    var txtHigh = inputHighBox.value;
    var low = (txtLow == null || txtLow == '') ? -1 : parseInt(txtLow);
    var high = (txtHigh == null || txtHigh == '') ? -1 : parseInt(txtHigh);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredit(low, high, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = "" + getTotalCredits(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredit(low, high, courses) {
    return low == 0 && high > 8 ? dataCourses : courses.filter(function (c) {
        return c.credits >= low && c.credits <= high;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredit.onclick = function () { return applyFilterByCredit(); };

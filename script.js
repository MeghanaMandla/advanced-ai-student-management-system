let students = JSON.parse(
localStorage.getItem("students")
) || [];

/* Sections */

function showSection(sectionId){

    let sections =
    document.querySelectorAll(".section");

    sections.forEach(section => {

        section.classList.remove("active");
    });

    document
    .getElementById(sectionId)
    .classList.add("active");
}

/* Add Student */

function addStudent(){

    let name =
    document.getElementById("name").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let course =
    document.getElementById("course").value.trim();

    if(name === "" ||
       email === "" ||
       course === ""){

        notify("Fill all fields");

        return;
    }

    let student = {

        id:Date.now(),

        name:sanitize(name),

        email:sanitize(email),

        course:sanitize(course)
    };

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    renderStudents();

    updateDashboard();

    notify("Student Added");

    clearInputs();
}

/* Render */

function renderStudents(){

    let table =
    document.getElementById("studentTable");

    table.innerHTML = `

    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Course</th>
        <th>Action</th>
    </tr>
    `;

    students.forEach(student => {

        let row = table.insertRow();

        row.innerHTML = `

        <td>${student.name}</td>

        <td>${student.email}</td>

        <td>${student.course}</td>

        <td>

        <button onclick="editStudent(${student.id})">
        Edit
        </button>

        <button onclick="deleteStudent(${student.id})">
        Delete
        </button>

        </td>
        `;
    });
}

/* Edit */

function editStudent(id){

    let student =
    students.find(s => s.id === id);

    let name =
    prompt("Edit Name", student.name);

    if(name){

        student.name = sanitize(name);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        renderStudents();

        notify("Updated");
    }
}

/* Delete */

function deleteStudent(id){

    students =
    students.filter(s => s.id !== id);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    renderStudents();

    updateDashboard();

    notify("Deleted");
}

/* Search */

function searchStudent(){

    let input =
    document
    .getElementById("search")
    .value.toLowerCase();

    let rows =
    document.querySelectorAll("#studentTable tr");

    rows.forEach((row,index) => {

        if(index === 0) return;

        row.style.display =
        row.innerText
        .toLowerCase()
        .includes(input)
        ? ""
        : "none";
    });
}

/* Dashboard */

function updateDashboard(){

    document
    .getElementById("totalStudents")
    .innerText = students.length;
}

/* Notification */

function notify(message){

    let notification =
    document.createElement("div");

    notification.className =
    "notification";

    notification.innerText =
    message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.remove();

    },3000);
}

/* Clear */

function clearInputs(){

    document.getElementById("name").value="";

    document.getElementById("email").value="";

    document.getElementById("course").value="";
}

/* Security */

function sanitize(input){

    return input
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}

/* Chart */

const ctx =
document.getElementById("studentChart");

new Chart(ctx, {

    type:"bar",

    data:{

        labels:["Students","Courses"],

        datasets:[{

            label:"Analytics",

            data:[students.length,12],

            backgroundColor:[
                "#2563eb",
                "#06b6d4"
            ]
        }]
    }
});

/* QR */

new QRCode(

document.getElementById("qrcode"),

"Student Attendance System"
);

/* AI */

async function askAI(){

    let prompt =
    document.getElementById("aiPrompt").value;

    document
    .getElementById("aiResponse")
    .innerText =

    "AI feature ready. Add Gemini API key.";
}

/* Load */

renderStudents();

updateDashboard();

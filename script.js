/* Students Database */

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

/* Render Students */

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

/* Edit Student */

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

        notify("Student Updated");
    }
}

/* Delete Student */

function deleteStudent(id){

    students =
    students.filter(s => s.id !== id);

    localStorage.setItem(

        "students",

        JSON.stringify(students)
    );

    renderStudents();

    updateDashboard();

    notify("Student Deleted");
}

/* Search */

function searchStudent(){

    let input =
    document
    .getElementById("search")
    .value.toLowerCase();

    let rows =
    document.querySelectorAll(
        "#studentTable tr"
    );

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

/* Notifications */

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

/* Security */

function sanitize(input){

    return input
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}

/* Clear Inputs */

function clearInputs(){

    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("course").value="";
}

/* QR Attendance */

new QRCode(

document.getElementById("qrcode"),

"Student Attendance System"
);

/* Face Recognition */

async function startFaceRecognition(){

    const video =
    document.getElementById("video");

    navigator.mediaDevices
    .getUserMedia({ video:{} })

    .then(stream => {

        video.srcObject = stream;
    });

    notify("Face Recognition Started");
}

/* AI Assistant */

async function askAI(){

    let prompt =
    document.getElementById("aiPrompt").value;

    document
    .getElementById("aiResponse")
    .innerText =

    "AI Assistant Ready: " + prompt;
}

/* Analytics */

const ctx =
document.getElementById("studentChart");

new Chart(ctx, {

    type:"bar",

    data:{

        labels:[
            "Students",
            "Courses"
        ],

        datasets:[{

            label:"Analytics",

            data:[
                students.length,
                12
            ],

            backgroundColor:[
                "#06b6d4",
                "#2563eb"
            ]
        }]
    }
});

/* Loader */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader")
        .style.display = "none";

    },1500);
});

/* Dashboard Counter Animation */

function animateCounter(id,target){

    let count = 0;

    let interval = setInterval(() => {

        count++;

        document.getElementById(id)
        .innerText = count;

        if(count >= target){

            clearInterval(interval);
        }

    },30);
}

animateCounter(
    "totalStudents",
    students.length
);

/* Initial Load */

renderStudents();

updateDashboard();

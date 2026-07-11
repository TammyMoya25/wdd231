const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces the development of software...', technology: ['Python'], completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces the planning and designing...', technology: ['HTML', 'CSS'], completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'Students become sophisticated with functions...', technology: ['Python'], completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'Students learn how to create dynamic websites...', technology: ['HTML', 'CSS', 'JavaScript'], completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces Object-Oriented Programming...', technology: ['C#'], completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'Focuses on structural layout and responsive architectural patterns...', technology: ['HTML', 'CSS', 'JavaScript'], completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("course-container");
    const creditSpan = document.getElementById("total-credits");

    const filterAll = document.getElementById("filter-all");
    const filterCse = document.getElementById("filter-cse");
    const filterWdd = document.getElementById("filter-wdd");

    function displayCourses(filteredList) {
        // Clear previous grid elements
        container.innerHTML = "";

        // Build individual cards dynamically
        filteredList.forEach(course => {
            const card = document.createElement("div");
            card.className = `course-item ${course.completed ? 'completed' : ''}`;
            card.textContent = `${course.subject} ${course.number}`;
            container.appendChild(card);
        });

        // Compute total values strictly utilizing the array reduce method
        const totalCredits = filteredList.reduce((accumulator, item) => accumulator + item.credits, 0);
        creditSpan.textContent = totalCredits;
    }

    function updateActiveState(activeButton) {
        [filterAll, filterCse, filterWdd].forEach(btn => btn.classList.remove("active"));
        activeButton.classList.add("active");
    }

    // Interactive Button Actions
    filterAll.addEventListener("click", () => {
        updateActiveState(filterAll);
        displayCourses(courses);
    });

    filterCse.addEventListener("click", () => {
        updateActiveState(filterCse);
        displayCourses(courses.filter(course => course.subject === "CSE"));
    });

    filterWdd.addEventListener("click", () => {
        updateActiveState(filterWdd);
        displayCourses(courses.filter(course => course.subject === "WDD"));
    });

    // Run baseline default population rule
    displayCourses(courses);
});
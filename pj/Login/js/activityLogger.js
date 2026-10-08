/**
 * บันทึกกิจกรรมของผู้ใช้งานลงใน localStorage
 */
function logUserActivity(action, details = "") {
    const username = localStorage.getItem("username") || "พนักงาน";
    
    const now = new Date();
    const timestamp = now.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const newLog = {
        id: "LOG-" + Date.now(),
        user: username,
        action: action,
        details: details,
        timestamp: timestamp
    };

    const logs = JSON.parse(localStorage.getItem("userActivityLogs")) || [];
    logs.unshift(newLog);
    localStorage.setItem("userActivityLogs", JSON.stringify(logs));
}

/**
 * ดึงประวัติกิจกรรมทั้งหมด
 */
function getUserActivityLogs() {
    return JSON.parse(localStorage.getItem("userActivityLogs")) || [];
}
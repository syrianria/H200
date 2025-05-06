<script>
document.getElementById('absence-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const studentName = document.getElementById('student-name').value;
  const teacherName = "حصه";
  const subject = "رياضيات";
  const reason = "الخروج المؤقت";
  const movementType = document.getElementById('movement-type').value;

  // إصلاح: تحديد الوقت الحالي إذا ما تم اختيار وقت يدوي
  let timestampValue = document.getElementById('timestamp').value;
  const timestamp = timestampValue ? new Date(timestampValue) : new Date();

  let resultMessage = '';

  if (movementType === 'رجوع') {
    const exitTime = new Date(localStorage.getItem('exitTime'));

    if (exitTime && !isNaN(exitTime)) {
      const durationMinutes = Math.floor((timestamp - exitTime) / 60000);
      resultMessage = `
        <h2>تصريح الرجوع</h2>
        <p><strong>اسم الطالبة:</strong> ${studentName}</p>
        <p><strong>اسم المعلمة:</strong> ${teacherName}</p>
        <p><strong>المادة:</strong> ${subject}</p>
        <p><strong>الغرض:</strong> ${reason}</p>
        <p><strong>الوقت:</strong> ${timestamp.toLocaleString()}</p>
        <p><strong>مدة الغياب:</strong> ${durationMinutes} دقيقة</p>
        <p><strong>تصريح الرجوع: تم بنجاح!</strong></p>
      `;
    } else {
      resultMessage = "<p>لا يوجد وقت خروج مسجل، تأكدي من تسجيل الخروج أولًا.</p>";
    }

  } else {
    // تسجيل وقت الخروج في التخزين المحلي
    localStorage.setItem('exitTime', timestamp);
    resultMessage = `
      <h2>تصريح الخروج</h2>
      <p><strong>اسم الطالبة:</strong> ${studentName}</p>
      <p><strong>اسم المعلمة:</strong> ${teacherName}</p>
      <p><strong>المادة:</strong> ${subject}</p>
      <p><strong>الغرض:</strong> ${reason}</p>
      <p><strong>الوقت:</strong> ${timestamp.toLocaleString()}</p>
      <p><strong>تصريح الخروج: تم بنجاح!</strong></p>
    `;
  }

  document.getElementById('result').innerHTML = resultMessage;
});
</script>

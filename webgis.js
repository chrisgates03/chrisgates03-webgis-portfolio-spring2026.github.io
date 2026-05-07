
    const btns = document.querySelectorAll('.info-btn');
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDesc = document.getElementById('popupDesc');
    const popupExtra = document.getElementById('popupExtra');
    const closeBtn = document.getElementById('closeBtn');

    
    function showPopup(infoData) {
    
        let data;
        try {
            data = JSON.parse(infoData);
        } catch(e) {
            data = { title: "Info", desc: "Project details", extra: "" };
        }
        popupTitle.textContent = data.title || "Project Info";
        popupDesc.textContent = data.desc || "No description provided.";
        popupExtra.textContent = data.extra || "";
        popup.classList.add('show');
    }

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            e.preventDefault();
            const infoJson = btn.getAttribute('data-info');
            if (infoJson) {
                showPopup(infoJson);
            } else {
                showPopup('{"title":"Info","desc":"Additional details about this project.","extra":""}');
            }
        });
    });
    
popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });
    closeBtn.addEventListener('click', closePopup);
   
    function closePopup() {
        popup.classList.remove('show');
    }
   
    closeBtn.addEventListener('click', closePopup);

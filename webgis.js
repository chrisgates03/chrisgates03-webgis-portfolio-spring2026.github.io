
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
//did I do this right? it works i guess
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



//will this make the cards clickable?
const cards = document.queryselectorAll('card');
cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
        //popup button triggers card click, this might fix, not sure if I understand thihs correctly
    if (e.target.classList.contains('info-btn')) {
        return}

const urls = [
    'https://chrisgates03.github.io/phubrichtimap/' //salamander map
    'https://storymaps.arcgis.com/stories/3d693fd95b5045f0ac7e9d5bca514cf7' //storymap link, don't forget to publish changes
    'https://chrisgates03.github.io/bostonlighthouses/' //lighthouse map
        ];

//make them open in new tab?
        
   window.open(urls[index], '_blank');

    card.stlye.cursor = 'pointer';
    });


// Project dataset: each project's extra information.
    // can be extended dynamically, but for this demo we simulate data.
    const projectsData = {
        1: {
            title: "Alpine Escape — Extended Info",
            description: "A visual journey through the Swiss Alps. This project blends landscape photography with immersive storytelling. Captured over 14 days in harsh conditions.",
            meta: "📅 2024 · Tools: Sony A7III, Lightroom · Client: NatureScapes"
        },
        2: {
            title: "Urban Flow — Architecture Series",
            description: "Exploration of vertical cities & reflections. Mixed media installation featured at Milan Design Week. The project highlights motion and structural rhythm.",
            meta: "🎨 collaboration with Studio K2 · 2023 · award: Arch Photo Prize"
        },
        3: {
            title: "Bird’s Eye Journal",
            description: "Aerial drone photography combined with hand-drawn illustrations. Limited edition art book sold out in pre-order. Focuses on migration patterns.",
            meta: "📖 80 pages · published by Aether Press · ISBN 978-0-992-4567"
        },
        4: {
            title: "Chromatic Echo",
            description: "Generative art using custom shaders and real-time data. Featured in Digital Canvas Biennale. The palette shifts based on environmental sound.",
            meta: "💻 Three.js + WebGL · Sound reactive · 2024 release"
        }
    };

    // references
    const popupOverlay = document.getElementById('infoPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDesc = document.getElementById('popupDescription');
    const popupMetaDiv = document.getElementById('popupMeta');
    const closeBtn = document.getElementById('closePopupBtn');

    // Function to open popup with data from specific project ID
    function openPopup(projectId) {
        // get project data, fallback defaults
        const data = projectsData[projectId] || {
            title: "Information",
            description: "No additional details provided for this project.",
            meta: "✨ Check back for updates"
        };
        
        // populate popup content
        popupTitle.textContent = data.title;
        popupDesc.textContent = data.description;
        popupMetaDiv.textContent = data.meta;
        
        // show overlay (active class)
        popupOverlay.classList.add('active');
        // optional: prevent background scroll
        document.body.style.overflow = 'hidden';
    }

    // close popup function
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // attach click event to every .info-btn inside .image-wrapper
    const infoButtons = document.querySelectorAll('.info-btn');
    
    infoButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            // critical: stop propagation so that the click does NOT trigger the parent image link
            event.stopPropagation();
            // prevent any default behavior (none needed for div, but best practice)
            event.preventDefault();
            
            // retrieve the custom data-project attribute (string) from button
            const projectIdRaw = btn.getAttribute('data-project');
            if (projectIdRaw) {
                openPopup(projectIdRaw);
            } else {
                // fallback: if somehow missing, get from closest .portfolio-card index? but safer just default
                openPopup('1');
            }
        });
    });
    
    // close popup when clicking on overlay background (outside popup-card)
    popupOverlay.addEventListener('click', (event) => {
        // if the clicked element is the overlay itself (background), close
        if (event.target === popupOverlay) {
            closePopup();
        }
    });
    
    // close button click handler
    closeBtn.addEventListener('click', closePopup);
    
    // optional: close popup with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    // ensure that if any image link inside .image-wrapper also works, but we must not conflict with info button.
    // The .info-btn stops propagation, so clicking the info button will not redirect.
    // For the actual image link, we keep original href behaviour. For demo purposes replace "#" with actual link if needed.
    // Also we want the corner button to be fully accessible: aria-label addition for better acc.
    const allInfoBtns = document.querySelectorAll('.info-btn');
    allInfoBtns.forEach(btn => {
        btn.setAttribute('aria-label', 'More information about this project');
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        // allow keyboard activation: Enter or Space on the button
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                const projectId = btn.getAttribute('data-project');
                if (projectId) openPopup(projectId);
            }
        });
    });
    
    console.log("Info popup system ready! Click the (i) button at image corner.");

function loadActivity(index) {
    const container = document.getElementById("speakers-container");
    container.innerHTML = ""; 

    if (index >= jadwalSenin.length) {
        document.getElementById("act-title").innerText = "🎉 Acara Hari Senin Selesai!";
        document.getElementById("act-time").style.display = "none";
        document.getElementById("act-detail").innerText = "Rangkaian acara hari pertama selesai dilaksanakan.";
        document.getElementById("timer").innerText = "00:00";
        document.getElementById("btn-start").disabled = true;
        document.getElementById("btn-pause").disabled = true;
        document.getElementById("btn-next").disabled = true;
        music.pause();
        document.getElementById("music-status").innerText = "Mati";
        return;
    }

    const data = jadwalSenin[index];
    
    // --- 1. EDIT ISI AREA MATERINYA DI SINI ---
    const actTitle = document.getElementById("act-title");
    actTitle.innerText = data.judul;
    actTitle.style.fontFamily = "'Fredoka', sans-serif";
    actTitle.style.fontSize = "26px";
    actTitle.style.color = "#1b5e20"; // Hijau tua kartun
    actTitle.style.textShadow = "1px 1px 0px #fff";

    const actTime = document.getElementById("act-time");
    actTime.style.display = "inline-block";
    actTime.innerText = "⏰ " + data.waktu;
    actTime.style.fontFamily = "'Fredoka', sans-serif";
    actTime.style.background = "#ff6f00"; // Oranye gembung
    actTime.style.color = "#ffffff";
    actTime.style.border = "3px solid #0a330e";
    actTime.style.boxShadow = "0 4px 0px #b55200";
    actTime.style.borderRadius = "20px";
    actTime.style.padding = "6px 16px";

    const actDetail = document.getElementById("act-detail");
    actDetail.innerText = data.detail;
    actDetail.style.fontSize = "16px";
    actDetail.style.fontWeight = "700";
    actDetail.style.color = "#37474f";

    document.getElementById("progress").innerText = `Aktivitas ${index + 1} dari ${jadwalSenin.length}`;
    
    // --- 2. EDIT KOTAK BINGKAI FOTO PEMATERI (KIRI) ---
    container.style.background = "linear-gradient(135deg, #a4db9b 0%, #1b5e20 100%)";
    container.style.border = "5px solid #0a330e";
    container.style.borderRadius = "32px";
    container.style.boxShadow = "inset 0 10px 0px rgba(0,0,0,0.15), 0 8px 0px rgba(0,0,0,0.1)";

    data.petugas.forEach((p, i) => {
        const wrapper = document.createElement("div");
        wrapper.className = "speaker-wrapper";
        // Efek melayang kartun dinamis
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";
        wrapper.style.position = "relative";
        wrapper.style.animation = "floatCartoon 4s ease-in-out infinite";
        wrapper.style.animationDelay = `${i * 0.4}s`;
        
        const img = document.createElement("img");
        img.className = "speaker-photo";
        img.src = p.foto;
        img.alt = p.nama;
        img.style.width = "180px";
        img.style.height = "280px";
        img.style.objectFit = "contain";
        img.style.filter = "drop-shadow(5px 5px 0px #0a330e)";
        
        const nameTag = document.createElement("div");
        nameTag.className = "speaker-name";
        nameTag.innerText = p.nama;
        nameTag.style.marginTop = "-10px";
        nameTag.style.fontFamily = "'Fredoka', sans-serif";
        nameTag.style.fontSize = "13px";
        nameTag.style.fontWeight = "700";
        nameTag.style.color = "#1b5e20";
        nameTag.style.background = "#ffd700"; // Kuning Pop
        nameTag.style.padding = "8px 16px";
        nameTag.style.borderRadius = "18px";
        nameTag.style.border = "3px solid #0a330e";
        nameTag.style.boxShadow = "0 5px 0px #c5a000";
        nameTag.style.zIndex = "5";
        nameTag.style.whiteSpace = "nowrap";
        
        wrapper.appendChild(img);
        wrapper.appendChild(nameTag);
        container.appendChild(wrapper);
    });

    timeLeft = data.durasi;
    updateTimerDisplay();
    
    document.getElementById("btn-start").disabled = false;
    document.getElementById("btn-pause").disabled = true;
}

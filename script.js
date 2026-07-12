const idPhotos = {
    abdurrahman: "18OK2aJd-rJqoMr9TjOgZzhv5lkysJ55w",
    rofiq: "1-UnhtkKqrjxvWh7muXhG-AFJ5DqV7TjT",
    sitiLailatul: "1Lxr3PuzOkG5RghYU6X3s6l1YGNoSdh3A",
    kusumaWardani: "1CroqKQYrHsDzZOBiTI4iFdFEA5l7_EmK",
    sulaimanWahyu: "15Nk4hQwZQZ9mQOwRWcmWryqkiKMcWk9P",
    baratut: "1bz5tmvLoVopX37NGzpIPXIDLO58VrTEb",
    irmaNur: "18bqrkUSWN3kU9hrnttnEe4TcBMAZCKd0"
};

function getDirectLink(id) {
    return `https://lh3.googleusercontent.com/d/$${id}`;
}

const jadwalSenin = [
    {
        waktu: "06.30 - 07.15 WIB",
        judul: "Pembiasaan Pagi & Ritual Pembuka Wajib",
        detail: "Muroja'ah Surat Pendek dan Sholat Dhuha Berjamaah bersama murid.",
        petugas: [
            { nama: "Ustd. Abdurrahman", foto: getDirectLink(idPhotos.abdurrahman) },
            { nama: "Ustd. Rofiq", foto: getDirectLink(idPhotos.rofiq) }
        ],
        durasi: 2700
    },
    {
        waktu: "07.15 - 08.00 WIB",
        judul: "Pembukaan & Ice Breaking",
        detail: "Menyanyikan Lagu Indonesia Raya & Mars Madrasah, Sambutan Kepala Madrasah, dilanjutkan permainan Edukatif Lempar Bola Nama.",
        petugas: [
            { nama: "Ustdz. Siti Lailatul F.", foto: getDirectLink(idPhotos.sitiLailatul) },
            { nama: "Ustdz. Kusuma Wardani", foto: getDirectLink(idPhotos.kusumaWardani) }
        ],
        durasi: 2700 
    },
    {
        waktu: "08.00 - 08.30 WIB",
        judul: "Matamuda Rising Stars Quiz & Reward",
        detail: "Sosialisasi Aplikasi dan Regulasi Bintang Harian Matamuda Rising Stars.",
        petugas: [
            { nama: "Ustd. Sulaiman Wahyu", foto: getDirectLink(idPhotos.sulaimanWahyu) }
        ],
        durasi: 1800 
    },
    {
        waktu: "08.30 - 09.00 WIB",
        judul: "Istirahat Ringan / Snack Time",
        detail: "Murid menikmati snack sehat bersama dibimbing adab makan yang benar.",
        petugas: [
            { nama: "Ustdz. Baratut", foto: getDirectLink(idPhotos.baratut) }
        ],
        durasi: 1800
    },
    {
        waktu: "09.00 - 09.45 WIB",
        judul: "Eksplorasi Lingkungan: Amazing Race",
        detail: "Berkeliling area madrasah (kelas, perpus, UKS dll) secara berkelompok.",
        petugas: [
            { nama: "Ustdz. Irma Nur Waqiah", foto: getDirectLink(idPhotos.irmaNur) }
        ],
        durasi: 2700
    },
    {
        waktu: "09.45 - 10.30 WIB",
        judul: "Ritual Penutup & Apresiasi",
        detail: "Refleksi harian 'Bintang Hari Ini', Tepuk Panca Cinta, Berdoa dan Pulang.",
        petugas: [
            { nama: "Ustd. Sulaiman Wahyu", foto: getDirectLink(idPhotos.sulaimanWahyu) }
        ],
        durasi: 2700
    }
];

let currentIndex = 0;
let timeLeft = 0;
let timerInterval = null;
let isRunning = false;
const music = document.getElementById("bg-music");

function playAlarmEffect() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 2); 
}

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
    document.getElementById("act-title").innerText = data.judul;
    document.getElementById("act-time").style.display = "inline-block";
    document.getElementById("act-time").innerText = "⏰ " + data.waktu;
    document.getElementById("act-detail").innerText = data.detail;
    document.getElementById("progress").innerText = `Aktivitas ${index + 1} dari ${jadwalSenin.length}`;
    
    data.petugas.forEach((p, i) => {
        const wrapper = document.createElement("div");
        wrapper.className = "speaker-wrapper";
        wrapper.style.animationDelay = `${i * 0.4}s`;
        
        const img = document.createElement("img");
        img.className = "speaker-photo";
        img.src = p.foto;
        img.alt = p.nama;
        
        const nameTag = document.createElement("div");
        nameTag.className = "speaker-name";
        nameTag.innerText = p.nama;
        
        wrapper.appendChild(img);
        wrapper.appendChild(nameTag);
        container.appendChild(wrapper);
    });

    timeLeft = data.durasi;
    updateTimerDisplay();
    
    document.getElementById("btn-start").disabled = false;
    document.getElementById("btn-pause").disabled = true;
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer").innerText = `${minutes}:${seconds}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    document.getElementById("btn-start").disabled = true;
    document.getElementById("btn-pause").disabled = false;

    music.play().catch(e => console.log("Izin audio aktif"));
    document.getElementById("music-status").innerText = "Looping 🎵";

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            music.pause();
            document.getElementById("music-status").innerText = "Mati";
            playAlarmEffect();
            alert(`Sesi "${jadwalSenin[currentIndex].judul}" Selesai!`);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    music.pause();
    document.getElementById("music-status").innerText = "Dijeda ⏸️";
    document.getElementById("btn-start").disabled = false;
    document.getElementById("btn-pause").disabled = true;
}

function nextActivity() {
    clearInterval(timerInterval);
    isRunning = false;
    currentIndex++;
    loadActivity(currentIndex);
}

loadActivity(currentIndex);

// --- DATA SOAL KUIS (10 Soal Berdasarkan Materi) ---
const quizData = [
    {
        question: "Kapan Presiden Soekarno mengeluarkan Dekrit Presiden yang membubarkan Konstituante dan kembali ke UUD 1945?",
        options: ["17 Agustus 1945", "5 Juli 1959", "1 Oktober 1965", "11 Maret 1966"],
        answer: 1
    },
    {
        question: "Apa singkatan dari ideologi yang diperkenalkan oleh Soekarno untuk menyatukan faksi-faksi politik pada masa Demokrasi Terpimpin?",
        options: ["Manipol USDEK", "Nasakom", "Tritura", "Supersemar"],
        answer: 1
    },
    {
        question: "Dua partai besar yang dibubarkan oleh pemerintah pada tahun 1960 karena dituduh terlibat PRRI/Permesta adalah...",
        options: ["PNI dan PKI", "NU dan Muhammadiyah", "Masyumi dan PSI", "Partindo dan PSII"],
        answer: 2
    },
    {
        question: "Siapakah perwira tinggi Angkatan Darat yang memimpin Komando Mandala dalam pembebasan Irian Barat (Trikora)?",
        options: ["A.H. Nasution", "Ahmad Yani", "Soeharto", "Yos Sudarso"],
        answer: 2
    },
    {
        question: "Kebijakan konfrontasi 'Ganyang Malaysia' yang dideklarasikan Indonesia menyebabkan Indonesia keluar dari PBB pada bulan apa?",
        options: ["Januari 1965", "Agustus 1964", "Maret 1966", "Oktober 1965"],
        answer: 0
    },
    {
        question: "Berapa tingkat hiperinflasi yang melanda perekonomian Indonesia menjelang tahun 1965?",
        options: ["100%", "250%", "400%", "600%"],
        answer: 3
    },
    {
        question: "Pasukan gabungan di bawah pimpinan siapa yang melakukan penculikan perwira tinggi Angkatan Darat pada dini hari 1 Oktober 1965?",
        options: ["Letkol Untung", "Mayjen Soeharto", "Kolonel Latief", "Kapten Pierre Tendean"],
        answer: 0
    },
    {
        question: "Apa saja isi pokok dari tuntutan TRITURA yang disuarakan oleh mahasiswa dan Front Pancasila pada 10 Januari 1966?",
        options: [
            "Bubarkan PKI, Turunkan Harga, Bentuk Angkatan Kelima",
            "Bubarkan PKI, Perombakan Kabinet Dwikora, Perbaikan Ekonomi/Turunkan Harga",
            "Kembali ke UUD 1945, Bentuk Nasakom, Keluar dari PBB",
            "Angkat Soekarno Presiden Seumur Hidup, Bubarkan Masyumi, Turunkan Harga"
        ],
        answer: 1
    },
    {
        question: "Surat Perintah 11 Maret (Supersemar) tahun 1966 memberikan mandat kepada siapa untuk mengambil tindakan pengamanan negara?",
        options: ["A.H. Nasution", "Soeharto", "Adam Malik", "Chaerul Saleh"],
        answer: 1
    },
    {
        question: "Ketetapan MPRS No. XXXIII/MPRS/1967 yang dikeluarkan pada Maret 1967 menandai berakhirnya kekuasaan siapa?",
        options: ["Mohammad Hatta", "Soeharto", "Soekarno", "Sutan Sjahrir"],
        answer: 2
    }
];

// --- VARIABEL STATE KUIS ---
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let answerSelected = false;

// --- ELEMEN DOM ---
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionCounter = document.getElementById('question-counter');
const timerDisplay = document.getElementById('timer');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');

// --- EVENT LISTENERS ---
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextQuestion);
restartBtn.addEventListener('click', startQuiz);

// --- FUNGSI UTAMA ---
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    welcomeScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Update Tampilan Nomor Soal
    questionCounter.innerText = `Soal ${currentQuestionIndex + 1} dari ${quizData.length}`;
    questionText.innerText = currentQuestion.question;

    // Buat Pilihan Opsi
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.classList.add('option-item');
        li.innerText = option;
        li.addEventListener('click', () => selectAnswer(index, li));
        optionsList.appendChild(li);
    });

    startTimer();
}

function resetState() {
    clearInterval(timer);
    timeLeft = 30;
    timerDisplay.innerText = `Waktu: ${timeLeft}s`;
    answerSelected = false;
    nextBtn.disabled = true;
    optionsList.innerHTML = '';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Waktu: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeOutHandler();
        }
    }, 1000);
}

function timeOutHandler() {
    if (answerSelected) return;
    answerSelected = true;
    clearInterval(timer);

    const correctAnswer = quizData[currentQuestionIndex].answer;
    const optionItems = optionsList.children;

    // Tandai jawaban benar
    optionItems[correctAnswer].classList.add('correct');
    disableAllOptions();
    nextBtn.disabled = false;
}

function selectAnswer(selectedIndex, selectedElement) {
    if (answerSelected) return;
    answerSelected = true;
    clearInterval(timer);

    const correctAnswer = quizData[currentQuestionIndex].answer;
    const optionItems = optionsList.children;

    if (selectedIndex === correctAnswer) {
        selectedElement.classList.add('correct');
        score++;
    } else {
        selectedElement.classList.add('incorrect');
        optionItems[correctAnswer].classList.add('correct');
    }

    disableAllOptions();
    nextBtn.disabled = false;
}

function disableAllOptions() {
    const optionItems = optionsList.children;
    for (let item of optionItems) {
        item.disabled = true;
    }
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    finalScore.innerText = `${score} / ${quizData.length}`;
    
    if (score === 10) {
        resultMessage.innerText = "Sempurna! Anda menguasai sejarah transisi Orde Lama dengan sangat baik.";
    } else if (score >= 7) {
        resultMessage.innerText = "Bagus sekali! Pemahaman sejarah Anda sudah cukup matang.";
    } else if (score >= 4) {
        resultMessage.innerText = "Cukup baik, tapi mari pelajari lagi materi sejarahnya agar lebih paham.";
    } else {
        resultMessage.innerText = "Jangan menyerah! Coba baca kembali materinya dan ulangi kuisnya.";
    }
}

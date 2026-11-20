// ==========================================
// DATA PASANGAN CALON
// ==========================================

const paslon = {
    1: {
        ketua: "Andi Pratama",
        wakil: "Budi Santoso"
    },

    2: {
        ketua: "Citra Maharani",
        wakil: "Dimas Saputra"
    },

    3: {
        ketua: "Eko Firmansyah",
        wakil: "Fajar Ramadhan"
    }
};


// ==========================================
// LOGIN ADMIN
// ==========================================

const usernameAdmin = "pmrsmkn2";
const passwordAdmin = "papeda2026";


function loginAdmin() {

    const username = document
        .getElementById("usernameAdmin")
        .value
        .trim();

    const password = document
        .getElementById("passwordAdmin")
        .value;

    if (
        username === usernameAdmin &&
        password === passwordAdmin
    ) {

        sessionStorage.setItem(
            "adminLogin",
            "true"
        );

        window.location.href = "hasil.html";

    } else {

        alert("Username atau password salah!");

    }

}


// ==========================================
// CEK LOGIN ADMIN
// ==========================================

function cekLoginAdmin() {

    const login = sessionStorage.getItem(
        "adminLogin"
    );

    if (login !== "true") {

        window.location.href = "admin.html";

        return;
    }

    tampilkanHasil();

}


// ==========================================
// LOGOUT ADMIN
// ==========================================

function logoutAdmin() {

    sessionStorage.removeItem(
        "adminLogin"
    );

    window.location.href = "admin.html";

}


// ==========================================
// KIRIM VOTING
// ==========================================

function kirimVoting() {

    const namaInput = document.getElementById(
        "namaPemilih"
    );

    const nama = namaInput.value.trim();

    const pilihan = document.querySelector(
        'input[name="paslon"]:checked'
    );


    // Cek nama

    if (nama === "") {

        alert("Silakan masukkan nama terlebih dahulu!");

        namaInput.focus();

        return;
    }


    // Cek pilihan

    if (!pilihan) {

        alert("Silakan pilih salah satu pasangan calon!");

        return;
    }


    // Ambil data lama

    let dataVoting = JSON.parse(
        localStorage.getItem("dataVoting")
    ) || [];


    // Cek apakah sudah pernah memilih

    const sudahMemilih = dataVoting.some(
        data =>
            data.nama.toLowerCase() ===
            nama.toLowerCase()
    );


    if (sudahMemilih) {

        alert(
            "Nama tersebut sudah melakukan voting!"
        );

        return;
    }


    // Data voting baru

    const dataBaru = {

        nama: nama,

        paslon: pilihan.value,

        waktu: new Date().toLocaleString(
            "id-ID"
        )

    };


    // Masukkan data

    dataVoting.push(dataBaru);


    // Simpan ke localStorage

    localStorage.setItem(
        "dataVoting",
        JSON.stringify(dataVoting)
    );


    alert(
        "Voting berhasil dikirim. Terima kasih!"
    );


    // Kembali ke halaman utama

    window.location.href = "index.html";

}


// ==========================================
// MENAMPILKAN HASIL VOTING
// ==========================================

function tampilkanHasil() {

    let dataVoting = JSON.parse(
        localStorage.getItem("dataVoting")
    ) || [];


    // Total suara

    const total = dataVoting.length;

    document.getElementById(
        "totalSuara"
    ).textContent = total;


    // Hitung suara

    let suara1 = 0;
    let suara2 = 0;
    let suara3 = 0;


    dataVoting.forEach(data => {

        if (data.paslon === "1") {
            suara1++;
        }

        if (data.paslon === "2") {
            suara2++;
        }

        if (data.paslon === "3") {
            suara3++;
        }

    });


    // Tampilkan jumlah suara

    document.getElementById(
        "suara1"
    ).textContent = suara1 + " suara";

    document.getElementById(
        "suara2"
    ).textContent = suara2 + " suara";

    document.getElementById(
        "suara3"
    ).textContent = suara3 + " suara";


    // Hitung persentase

    let persen1 = 0;
    let persen2 = 0;
    let persen3 = 0;


    if (total > 0) {

        persen1 =
            Math.round((suara1 / total) * 100);

        persen2 =
            Math.round((suara2 / total) * 100);

        persen3 =
            Math.round((suara3 / total) * 100);

    }


    // Progress bar

    const progress1 =
        document.getElementById("progress1");

    const progress2 =
        document.getElementById("progress2");

    const progress3 =
        document.getElementById("progress3");


    progress1.style.width =
        persen1 + "%";

    progress1.textContent =
        persen1 + "%";


    progress2.style.width =
        persen2 + "%";

    progress2.textContent =
        persen2 + "%";


    progress3.style.width =
        persen3 + "%";

    progress3.textContent =
        persen3 + "%";


    // Tabel pemilih

    const tabel =
        document.getElementById(
            "tabelPemilih"
        );


    tabel.innerHTML = "";


    if (dataVoting.length === 0) {

        tabel.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">
                    Belum ada suara masuk.
                </td>
            </tr>
        `;

        return;
    }


    dataVoting.forEach((data, index) => {

        const nomorPaslon =
            String(data.paslon).padStart(2, "0");


        const row = `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${data.nama}
                </td>

                <td>
                    Paslon ${nomorPaslon}
                </td>

                <td>
                    ${data.waktu}
                </td>

            </tr>

        `;


        tabel.innerHTML += row;

    });

}


// ==========================================
// HAPUS SEMUA DATA VOTING
// ==========================================

function hapusData() {

    const konfirmasi = confirm(
        "Yakin ingin menghapus semua data voting?"
    );


    if (!konfirmasi) {
        return;
    }


    localStorage.removeItem(
        "dataVoting"
    );


    alert(
        "Semua data voting berhasil dihapus."
    );


    tampilkanHasil();

}
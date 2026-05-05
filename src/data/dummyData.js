// Data dummy untuk development (tanpa database)
export const itemsData = [
  {
    id: 1,
    nama: 'Laptop ASUS ROG',
    kategori: 'Elektronik',
    lokasi: 'Gedung A',
    status: 'lost',  // lost, found, claimed, returned
    deskripsi: 'Laptop ASUS ROG warna putih, ada stiker di cover',
    foto: 'https://picsum.photos/400/300?random=1',
    tanggal: '2026-04-25',
    pelapor: 'Dwi Kurniawan'
  },
  {
    id: 2,
    nama: 'Flashdisk 32GB',
    kategori: 'Elektronik',
    lokasi: 'Gedung B',
    status: 'found',
    deskripsi: 'Flashdisk Sandisk hitam, ada gantungan kunci UB',
    foto: 'https://picsum.photos/400/300?random=2',
    tanggal: '2026-04-26',
    pelapor: 'Staff Lab'
  },
  {
    id: 3,
    nama: 'KTM Mahasiswa',
    kategori: 'Dokumen',
    lokasi: 'Gedung C',
    status: 'lost',
    deskripsi: 'KTM atas nama Tania Hertawan',
    foto: 'https://picsum.photos/400/300?random=3',
    tanggal: '2026-04-23',
    pelapor: 'Tania Hertawan'
  },
  {
    id: 4,
    nama: 'Dompet Coklat',
    kategori: 'Dompet',
    lokasi: 'Gedung E',
    status: 'found',
    deskripsi: 'Dompet kulit coklat merk Fossil',
    foto: 'https://picsum.photos/400/300?random=4',
    tanggal: '2026-04-27',
    pelapor: 'Staff Kantin'
  }
]

// Data user dummy untuk login
export const usersData = [
  {
    email: 'dwi@student.ub.ac.id',
    password: '123456',
    nama: 'Dwi Kurniawan',
    role: 'mahasiswa'
  },
  {
    email: 'staff@ub.ac.id',
    password: 'staff123',
    nama: 'Staff Vokasi',
    role: 'staff'
  }
]
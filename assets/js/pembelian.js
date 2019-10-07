var id = 0 // Untuk menampung ID yang kaan di ubah / hapus

function hapus_det_pembelian(id_detail) {

	swal({
		title: 'Peringatan',
		text: "Anda yakin akan menghapus data ini ?",
		type: 'warning',
		showCancelButton: true,
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		confirmButtonText: 'Ya, hapus!',
		cancelButtonText: 'Batal',
		buttonsStyling: false
	}).then(function (result) {
		if (result.value) {
			$.ajax({
				url: base_url + 'pembelian/hapusDetailPembelian/' + id_detail, // URL tujuan
				type: 'GET', // Tentukan type nya POST atau GET
				dataType: 'json',
				beforeSend: function (e) {
					if (e && e.overrideMimeType) {
						e.overrideMimeType('application/jsoncharset=UTF-8')
					}
				},
				success: function (response) { // Ketika proses pengiriman berhasil
					// $('#loading-hapus').hide() // Sembunyikan loading hapus

					// Ganti isi dari div view dengan view yang diambil dari proses_hapus.php
					$('#tampil_tabel').html(response.html)

					/*
					 * Ambil pesan suksesnya dan set ke div pesan-sukses
					 * Lalu munculkan div pesan-sukes nya
					 * Setelah 10 detik, sembunyikan kembali pesan suksesnya
					 */
					show_notif(response.status, response.pesan)

					// $('#delete-modal').modal('hide') // Close / Tutup Modal Dialog
				}
			})
		}
	})
}

$(document).ready(function () {
	$("#Material").select2({
		tags: true,
		dropdownParent: $("#createModal")
	})

	$('#btn-simpan').click(function () { // Ketika tombol simpan di klik

		var check_form = $("#ValidationModal").valid()

		if (check_form == true) {
			$("#ValidationModal").submit((e) => {
				e.preventDefault()
			})

			$.ajax({
				url: base_url + 'pembelian/addMaterial', // URL tujuan
				type: 'POST', // Tentukan type nya POST atau GET
				data: $("#createModal form").serialize(), // Ambil semua data yang ada didalam tag form
				dataType: 'json',
				beforeSend: function (e) {
					// setFormValidation('#ValidationModal');
					if (e && e.overrideMimeType) {
						e.overrideMimeType('application/jsoncharset=UTF-8')
					}
				},
				success: function (response) { // Ketika proses pengiriman berhasil

					if (response.status == 'success') { // Jika Statusnya = sukses
						// Ganti isi dari div tampil dengan tampil yang diambil dari proses_simpan.php
						$('#tampil_tabel').html(response.html)

						/*
						 * Ambil pesan suksesnya dan set ke div pesan-sukses
						 * Lalu munculkan div pesan-sukes nya
						 * Setelah 10 detik, sembunyikan kembali pesan suksesnya
						 */
						show_notif(response.status, response.pesan)

						$('#createModal').modal('hide') // Close / Tutup Modal Dialog
					} else { // Jika statusnya = gagal
						/*
						 * Ambil pesan errornya dan set ke div pesan-error
						 * Lalu munculkan div pesan-error nya
						 */
						show_notif(response.status, response.pesan)
					}
				},
				error: function (xhr, ajaxOptions, thrownError) { // Ketika terjadi error
					console.log(xhr.responseText) // munculkan alert
				}
			})
		}

	})

	$('#btn-ubah').click(function () { // Ketika tombol simpan di klik
		var check_form = $("#ValidationModal").valid()
		if (check_form == true) {
			$.ajax({
				url: base_url + 'pembelian/addMaterial', // URL tujuan
				type: 'POST', // Tentukan type nya POST atau GET
				data: $("#editModal form").serialize(), // Ambil semua data yang ada didalam tag form
				dataType: 'json',
				beforeSend: function (e) {
					if (e && e.overrideMimeType) {
						e.overrideMimeType('application/jsoncharset=UTF-8')
					}
				},
				success: function (response) { // Ketika proses pengiriman berhasil

					if (response.status == 'success') { // Jika Statusnya = sukses
						// Ganti isi dari div tampil dengan tampil yang diambil dari proses_simpan.php
						$('#tampil_tabel').html(response.html)

						/*
						 * Ambil pesan suksesnya dan set ke div pesan-sukses
						 * Lalu munculkan div pesan-sukes nya
						 * Setelah 10 detik, sembunyikan kembali pesan suksesnya
						 */

						show_notif(response.status, response.pesan)

						$('#editModal').modal('hide') // Close / Tutup Modal Dialog
					} else { // Jika statusnya = gagal
						/*
						 * Ambil pesan errornya dan set ke div pesan-error
						 * Lalu munculkan div pesan-error nya
						 */
						show_notif(response.status, response.pesan)
					}
				},
				error: function (xhr, ajaxOptions, thrownError) { // Ketika terjadi error
					console.log(xhr.responseText) // munculkan alert
				}
			})
		}
	})

	$('#createModal').on('hidden.bs.modal', function (e) { // Ketika Modal Dialog di Close / tertutup
		// $('#createModal').trigger("reset");
		$('#createModal input[name=jumlah], #createModal select[name=materialid]').val('') // Clear inputan menjadi kosong
	})
})

function show_notif(status, pesan) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000
	})
	Toast.fire({
		type: status,
		title: pesan
	})
}

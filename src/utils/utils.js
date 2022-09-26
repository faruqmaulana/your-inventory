// import axios from 'axios'
// import Swal from 'sweetalert2'
// import { useRouter } from 'next/router'

// export function DeleteHandler(patch, id) {
//     const newLocal = useRouter();
//     const router = newLocal;
//     console.log(router)
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             (async () => {
//                 try {
//                     const result = await axios.delete(`/api/delete/${patch}/${id}`, id);
//                     Swal.fire({
//                         icon: "success",
//                         title: result.data.message,
//                         showConfirmButton: false,
//                         timer: 1800,
//                     });

//                     setTimeout(() => {
//                         router.replace(router.asPath);
//                     }, 1800);

//                 } catch (error) {
//                     Swal.fire({
//                         icon: "error",
//                         title: 'Gagal menghapus data!',
//                         text: 'Kategori yang anda hapus memiliki relasi dengan data lain, hapus data terkait untuk melanjutkan!',
//                     });
//                 }
//             })()
//         }
//     })
// }

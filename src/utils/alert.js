import Swal from 'sweetalert2'

export const alert = (title, msg, desc, state, bool) => {
    Swal.fire({
        icon: "success",
        title,
        text: `${msg} ditambahkan kedalam list ${desc}`,
        showConfirmButton: state,
        timer: bool
    });
}
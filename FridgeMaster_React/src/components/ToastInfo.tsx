import Swal from "sweetalert2";

export function showToast(message: string, icon: "success" | "error" | "warning" | "info" = "info") {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

    });
    Toast.fire({
        icon: icon,
        title: message
    });

}

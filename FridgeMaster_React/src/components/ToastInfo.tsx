import Swal from "sweetalert2";

type ToastParams = {
    message: string;
    icon?: "success" | "error" | "warning" | "info";
}

export function showToast(params:ToastParams) {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

    });
    Toast.fire({
        icon: params.icon,
        title: params.message
    });

}

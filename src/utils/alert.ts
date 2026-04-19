import Swal from "sweetalert2";

export const showSuccess = (message: string) => {
  Swal.fire({
    icon: "success",
    title: message,
    toast: true,
    position: "bottom-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#1f2937",
    color: "#f3f4f6",
  });
};

export const showError = (message: string) => {
  Swal.fire({
    icon: "error",
    title: message,
    toast: true,
    position: "bottom-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#1f2937",
    color: "#f3f4f6",
  });
};

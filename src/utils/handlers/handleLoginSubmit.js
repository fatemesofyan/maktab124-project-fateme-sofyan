// import { validateLoginForm } from "@/utils/validateLoginForm";
// import { loginUser } from "@/services/auth";

// export const handleLoginSubmit = async ({
//   formData,
//   setError,
//   setIsLoading,
//   router,
// }) => {
//   setError(null);

//   const { isValid, errors } = validateLoginForm(formData);
//   if (!isValid) {
//     setError(Object.values(errors)[0]);
//     return;
//   }

//   setIsLoading(true);

//   try {
//     const result = await loginUser(formData);

//     if (!result.success) {
//       setError(result.error);
//     } else {
//       localStorage.setItem("token", result.accessToken);
//       localStorage.setItem("role", result.role);
//       router.push(result.role === "ADMIN" ? "/admin" : "/");
//     }
//   } catch (err) {
//     setError(err.message || "خطایی در ورود پیش آمد.");
//   } finally {
//     setIsLoading(false);
//   }
// };

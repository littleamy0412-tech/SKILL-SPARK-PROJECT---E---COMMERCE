import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast, Toaster } from "sonner";
import { useNavigate} from 'react-router'

function Register() {
    const navigate = useNavigate()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        username: "",
        email: "",
        password: "",
    });

    const { t } = useTranslation();

    const put = (value) => t(`page.register.${value}`);

    const onSubmit = async (data) => {
        console.clear();
        try {
            const responsse = await fetch("/api/user/create", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await responsse.json();
            if (!responsse.ok) {
                console.log("No", res);
                let { message, duplicate_key } = res;
                if (message === "Duplicate error") {
                    message = duplicate_key[0] + " already in use";
                }
                message = message.charAt(0).toUpperCase() + message.slice(1);
                toast.warning(message);
                return;
            }

            toast.success(res.message);

            setTimeout(async () => {
                const { username, password } = data;
                const response = await fetch("/api/user/login", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
                const res = await response.json();
                console.log(res);
                navigate('/account')
            }, 2000);

            reset({
                username: "",
                email: "",
                password: "",
            });

        } catch (err) {
            toast.error("Internal Server Error");
        }
    };
    return (
        <>
            <Toaster />
            <div
                id="wrapper"
                className="bg-white h-svh flex justify-center items-center"
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border border-gray-400 bg-white max-h-[400px] max-w-[500px] h-full w-full rounded-[10px] flex flex-col items-center justify-center gap-2 px-4"
                >
                    <h1 className="text-2xl font-bold">{put("title")}</h1>
                    <input
                        className="border py-2 px-4 rounded"
                        type="text"
                        name="username"
                        id="username"
                        placeholder={put("username")}
                        {...register("username")}
                    />
                    <p className="text-red-500 text-center font-light">
                        {errors.username?.message}
                    </p>

                    <input
                        className="border py-2 px-4 rounded"
                        type="email"
                        name="email"
                        id="email"
                        placeholder={put("email")}
                        {...register("email")}
                    />
                    <p className="text-red-500 text-center font-light">
                        {errors.username?.message}
                    </p>

                    <input
                        className="border py-2 px-4 rounded"
                        type="password"
                        name="password"
                        id="password"
                        placeholder={put("password")}
                        {...register("password")}
                    />
                    <p className="text-red-500 text-center font-light">
                        {errors.username?.message}
                    </p>

                    <button
                        type="submit"
                        className="bg-pink-500 text-white py-2 text-xl font-bold w-full rounded cursor-pointer transition duration-200 hover:bg-pink-400"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    );
}

export default Register;

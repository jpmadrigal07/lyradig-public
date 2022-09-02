import { useField } from "formik";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const PasswordTextField = ({ ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [field, meta] = useField(props);

  return (
    <>
      <div className="relative">
        <input
          {...field}
          {...props}
          type={isPasswordVisible ? "text" : "password"}
          className={`mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 hover:border-gray-300 focus:border-gray-300 block w-full shadow-sm sm:text-sm border-gray-200 rounded-md disabled:cursor-not-allowed disabled:opacity-40 ${
            meta.touched && meta.error && "border-red-300"
          }`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isPasswordVisible ? (
            <EyeIcon
              className="h-5 w-5 text-gray-400 hover:cursor-pointer hover:text-gray-500"
              onClick={() => setIsPasswordVisible(false)}
              aria-hidden="true"
            />
          ) : (
            <EyeOffIcon
              className="h-5 w-5 text-gray-400 hover:cursor-pointer hover:text-gray-500"
              onClick={() => setIsPasswordVisible(true)}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {meta.touched && meta.error && (
        <div className="text-xs text-red-600">{meta.error}</div>
      )}
    </>
  );
};

export default PasswordTextField;

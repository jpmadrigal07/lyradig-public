import { useField } from "formik";

const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        {...field}
        {...props}
        className={`mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 hover:border-gray-300 focus:border-gray-300 block w-full shadow-sm sm:text-sm border-gray-200 rounded-md disabled:cursor-not-allowed disabled:opacity-40 ${
          meta.touched && meta.error && "border-red-300"
        }`}
      />
      {meta.touched && meta.error && (
        <div className="text-xs text-red-600">{meta.error}</div>
      )}
    </>
  );
};

export default TextField;

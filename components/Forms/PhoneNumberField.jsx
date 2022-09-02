import { useField } from "formik";

const PhoneNumberField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="mt-1 flex rounded-md group">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          +63
        </span>
        <input
          {...field}
          {...props}
          maxLength={10}
          className={`w-full block shadow-sm p-2 text-sm border border-gray-200 group-hover:border-gray-300 focus:border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-40 ${
            meta.touched && meta.error && "border-red-300"
          }`}
        />
      </div>
      {meta.touched && meta.error && (
        <div className="text-xs text-red-600">{meta.error}</div>
      )}
    </>
  );
};

export default PhoneNumberField;

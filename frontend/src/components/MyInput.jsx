export const MyInput = ({ label, ...props }) => (
  <div className="flex flex-col mb-3">
    <label className="text-gray-700 font-bold mb-1">{label}</label>
    <input 
      {...props} 
      className="border-2 border-gray-200 p-2 rounded focus:border-blue-500 outline-none" 
    />
  </div>
);